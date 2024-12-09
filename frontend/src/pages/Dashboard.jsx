import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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
    // Generate random data for the table
    const dataTable = Array.from({ length: 10 }, (_, index) => ({
        Quizz_Title: `Quiz ${index + 1}`,
        Total: Math.floor(Math.random() * 100) , // Random total between 10 and 100
        Correct: Math.floor(Math.random() * 100) , // Random correct answers
        Incorrect: Math.floor(Math.random() * 100) , // Random incorrect answers
        score: Math.floor(Math.random() * 10), // Random score between 0 and 100
        color: `bg-${['green', 'blue', 'yellow', 'red', 'purple'][index % 5]}-200`
    }));

    const navigate = useNavigate();

    // Graph data based on the random data
    const graphData = {
        labels: dataTable.map(item => item.Quizz_Title),
        datasets: [
            {
                label: 'Score Over Time',
                data: dataTable.map(item => item.score), // Score data for the graph
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
                                    <th className="py-2 px-4">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTable.map((item, index) => {
                                    // Calculate the score based on the ratio of Correct/Total
                                    const ratio = item.Total > 0 ? item.Correct / item.Total : 0;
                                    const score = Math.min(Math.round(ratio * 10), 10);  // Ensure the score is between 0 and 10
                                    return (
                                        <tr key={index} className="hover:bg-gray-700">
                                            <td className="py-2 px-4">{item.Quizz_Title}</td>
                                            <td className="py-2 px-4">{item.Total}</td>
                                            <td className={`py-2 px-4 rounded-md`}>{item.Correct}</td>
                                            <td className="py-2 px-4">{item.Incorrect}</td>
                                            <td className="py-2 px-4">{score}</td>
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
