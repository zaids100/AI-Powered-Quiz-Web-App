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

  // Handle finishing the quiz
  const handleFinishQuiz = async () => {
    const email = localStorage.getItem("email"); // Ensure the correct email is fetched
    // const total=quizData.questions.length;
    if (!email) {
      console.error("Email not found. User may not be logged in.");
      return; // Abort if no email is found
    }
  
    const quizHistory = {
      score: score,
      quizTitle: quizData.quizTitle,
      email: email, // Ensure the correct email is passed
      total : quizData.questions.length
    };
  
    const url = `https://vercel.com/captain-calculus-projects/ai-powered-quiz-web-app/history/add-quiz-history`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizHistory),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Quiz data inserted into history successfully:", result);
      } else {
        console.error("Failed to insert quiz data:", result.message);
      }
    } catch (err) {
      console.error("Error during quiz history submission:", err);
    }
  
    // Navigate to quiz results
    navigate("/quiz-results", {
      state: { score, total: quizData.questions.length },
    });
  };
  

  // Handle option click
  const handleClick = (option) => {
    if (selectedOption) return; // Prevent further clicks if an option is already selected
    setSelectedOption(option); // Set selected option
    if (option === currentQuestion.answer) {
      setScore(score + 1); // Increment score if correct
    }
  };

  // Handle changing question or submitting the quiz
  const handleChangeQuestion = () => {
    if (currentIndex < quizData.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
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
                onClick={() => handleClick(option)} // Call handler
                className={optionStyle}
                style={{
                  pointerEvents: selectedOption ? "none" : "auto", // Disable clicks if an option is selected
                }}
              >
                {option}
              </li>
            );
          })}
        </ul>

        {/* Next Button */}
        <div className="mt-6">
          {currentIndex < quizData.questions.length - 1 && (
            <button
              onClick={handleChangeQuestion}
              className={`px-6 py-2 rounded-lg text-white ${
                selectedOption
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={!selectedOption} // Disable Next button until an option is selected
            >
              Next
            </button>
          )}

          {/* Finish Quiz Button */}
          {currentIndex === quizData.questions.length - 1 && (
            <button
              onClick={handleFinishQuiz}
              className={`px-6 py-2 rounded-lg text-white ${
                selectedOption
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={!selectedOption} // Disable Finish button until an option is selected
            >
              Finish Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizBox;
