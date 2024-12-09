import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Registering necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DashBoard() {
    const [quizHistory, setQuizHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const email = localStorage.getItem("email"); // Retrieve email from localStorage

    // Fetch quiz history on component mount
    useEffect(() => {
        const fetchQuizHistory = async () => {
            if (!email) {
                console.error("No email found in localStorage.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://vercel.com/captain-calculus-projects/ai-powered-quiz-web-app/history/get-quiz-history`, {
                    params: { email }, // Pass email as a query parameter
                });
                setQuizHistory(response.data.quizHistory);  // Set fetched quiz history data to state
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz history:", error);
                setLoading(false);
            }
        };
        fetchQuizHistory();
    }, [email]);

    // Check if data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Graph data based on the quiz history
    const graphData = {
        labels: quizHistory.map(item => item.title),  // Using 'title' for the graph labels
        datasets: [
            {
                label: 'Score Over Time',
                data: quizHistory.map(item => (item.score/item.total)*100), // Using 'score' from quiz history
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white p-4">
            <Header />
            <div className="flex w-full justify-between max-w-8xl bg-gray-800 p-6 rounded-md shadow-lg mb-2 animate-fadeIn">
                <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text rounded-md font-arial">DashBoard</h1>
                <button 
                    onClick={() => navigate("/")}
                    className="px-10 text-white text-xl bg-gradient-to-r from-red-500 to-blue-500 rounded-md hover:opacity-90"
                >Play</button>
            </div>
            <div className="h-full w-full bg-gray-800 p-6 rounded-md shadow-lg animate-fadeIn flex">
                {/* Left Section */}
                <div className="w-2/3 pr-6 border-r-2 border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold underline">Quizz History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-700">
                                    <th className="py-2 px-4">Quizz Title</th>
                                    <th className="py-2 px-4">Total</th>
                                    <th className="py-2 px-4">Correct</th>
                                    <th className="py-2 px-4">Incorrect</th>
                                    <th className="py-2 px-4">Accuracy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizHistory.map((item, index) => {
                                    const accuracy=(item.score/item.total)*100;
                                     // Use the score directly from the item
                                    return (
                                        <tr key={index} className="hover:bg-gray-700">
                                            <td className="py-2 px-4">{item.title}</td>
                                            <td className="py-2 px-4">{item.total}</td>
                                            <td className="py-2 px-4">{item.score}</td>
                                            <td className="py-2 px-4">{item.total-item.score}</td>
                                            <td className="py-2 px-4">{accuracy.toFixed(2)}</td> {/* Show score directly */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
    
                {/* Right Section with Graph */}
                <div className="w-1/3 pl-6">
                    <Line data={graphData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
