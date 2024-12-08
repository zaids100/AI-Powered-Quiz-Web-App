import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizBox = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.quizData;

  // Check if quiz data exists
  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1>No quiz data available!</h1>
      </div>
    );
  }

  // Initialize state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // Track correctness for all questions

  const currentQuestion = quizData.questions[currentIndex];

  const handleOptionClick = (option) => {
    if (selectedOption) return; // Prevent further clicks once answered

    setSelectedOption(option);

    // Check correctness
    const isCorrect = option === currentQuestion.correctAnswer;

    // Update score and answers
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion.question, isCorrect, selected: option },
    ]);
  };

  const handleNextClick = () => {
    if (currentIndex < quizData.questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selection for the next question
    } else {
      // Navigate to results page with the score and answers
      navigate("/quiz-results", { state: { score, total: quizData.questions.length, answers } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-md shadow-lg">
        {/* Question */}
        <h1 className="text-2xl font-bold mb-4">{currentQuestion.question}</h1>

        {/* Options */}
        <ul className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedOption;

            // Determine button style
            let optionStyle = "cursor-pointer p-4 rounded-lg text-lg ";
            if (selectedOption) {
              optionStyle += isCorrect
                ? "bg-green-500 text-white" // Correct answer
                : isSelected
                ? "bg-red-500 text-white" // Incorrect selection
                : "bg-gray-700 text-white"; // Other options
            } else {
              optionStyle += "bg-gray-700 hover:bg-gray-600 text-white";
            }

            return (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className={optionStyle}
              >
                {option}
              </li>
            );
          })}
        </ul>

        {/* Next Button */}
        <button
          onClick={handleNextClick}
          className={`mt-6 px-6 py-2 rounded-lg text-white ${
            selectedOption
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedOption} 
        >
          {currentIndex === quizData.questions.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizBox;
