import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.quizData;
  const currentQuestion = quizData?.questions[currentIndex];

  // Check if quiz data exists
  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1>No quiz data available!</h1>
      </div>
    );
  }

  // Handle option click
  const handleClick = (option) => {
    setSelectedOption(option); // Set selected option
    if (option === currentQuestion.answer) {
      setScore(score + 1); // Increment score if correct
    }
  };

  // Handle changing question or submitting the quiz
  const handleChangeQuestion = () => {
    if (currentIndex < quizData.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null); // Reset selected option for next question
    } else {
      navigate("/quiz-results", {
        state: { score, total: quizData.questions.length }, // Pass score and total directly
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{currentQuestion.question}</h1>

        {/* Options */}
        <ul className="space-y-4">
          {currentQuestion.options.map((option, ind) => {
            // Determine option style
            let optionStyle = "cursor-pointer p-4 rounded-lg text-lg ";
            if (selectedOption) {
              if (option === currentQuestion.answer) {
                optionStyle += "bg-green-500 text-white"; // Correct answer
              } else if (option === selectedOption) {
                optionStyle += "bg-red-500 text-white"; // Incorrect selected answer
              } else {
                optionStyle += "bg-gray-700 text-white"; // Unselected other options
              }
            } else {
              optionStyle += "bg-gray-700 hover:bg-gray-600 text-white"; // Default style
            }

            return (
              <li
                key={ind}
                onClick={() => handleClick(option)}
                className={optionStyle}
              >
                {option}
              </li>
            );
          })}
        </ul>

        {/* Next Button */}
        <button
          onClick={handleChangeQuestion}
          className={`mt-6 px-6 py-2 rounded-lg text-white ${selectedOption ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 cursor-not-allowed"}`}
          disabled={!selectedOption}
        >
          {currentIndex === quizData.questions.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizBox;
