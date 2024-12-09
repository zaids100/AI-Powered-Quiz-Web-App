import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
    const [quizInfo, setQuizInfo] = useState({
        topic: "",
        number: "", // Matches backend expectation
    });
    const [quizData, setQuizData] = useState(null); // Updated to track fetched quiz data
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizInfo((prev) => ({ ...prev, [name]: value }));
    };

    const getQuizzData = async () => {
        try {
            const url = "https://ai-powered-quiz-web-app.onrender.com/auth/quiz-box";
            const payload = {
                topic: quizInfo.topic,
                number: quizInfo.number,
            };

            console.log("Sending payload:", payload);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.msg || "Failed to fetch quiz data");
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Error creating quiz:", err.message);
            alert(err.message);
            return null;
        }
    };

    const handleCreateQuiz = async (e) => {
        e.preventDefault();
        const { topic, number } = quizInfo;

        if (!topic || !number) {
            return alert("All fields are required!");
        }

        setLoading(true);
        setProgress(0);

        // Fetch the quiz data
        const data = await getQuizzData();
        if (!data) {
            setLoading(false);
            return; // Exit if fetching quiz data failed
        }

        setQuizData(data);

        // Simulate progress bar loading
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 5;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setLoading(false);
                // Navigate to quiz-box with fetched data
                navigate("/quiz-box", { state: { quizData: data } });
            }
        }, 400);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-[#1E2128] bg-opacity-90 rounded-lg shadow-2xl backdrop-blur-md">
                <h2 className="text-3xl font-extrabold text-center text-white">Create a Quiz</h2>
                {!loading ? (
                    <form onSubmit={handleCreateQuiz} className="space-y-4">
                        <div>
                            <label
                                htmlFor="topic"
                                className="block text-sm font-medium text-white"
                            >
                                Topic
                            </label>
                            <input
                                type="text"
                                name="topic"
                                value={quizInfo.topic}
                                onChange={handleChange}
                                placeholder="Quiz Topic"
                                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="number"
                                className="block text-sm font-medium text-white"
                            >
                                Number of Questions
                            </label>
                            <input
                                type="number"
                                name="number"
                                value={quizInfo.number}
                                min={1}
                                onChange={handleChange}
                                placeholder="Number of Questions"
                                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-gradient-to-r from-red-500 to-blue-500 rounded-md hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Create Quiz
                        </button>
                    </form>
                ) : (
                    <div className="flex flex-col items-center">
                        <h3 className="text-white text-xl">Creating your quiz...</h3>
                        <div className="w-full mt-4 h-2 bg-gray-700 rounded-full">
                            <div
                                className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="mt-2 text-white">{progress}%</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateQuiz;
