import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {}; // Access score and total directly

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-2xl p-6 bg-[#1E2128] bg-opacity-90 rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text mb-8 text-center">
          Quiz Results
        </h1>
        <p className="text-3xl font-bold text-white mb-6 text-center">
          Correct: {score}
        </p>
        <p className="text-3xl font-bold text-white mb-6 text-center">
          Incorrect: {Number(total - score)}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 text-white bg-gradient-to-r from-red-500 to-blue-500 rounded-md hover:opacity-90"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
