import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 animate-fadeIn">
      {/* Main Heading with Bounce Effect */}
      <h1 className="text-8xl font-extrabold mb-6 bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text animate-bounceHeading">
        Let’s Play!
      </h1>

      {/* Subheading with Fade-in Effect */}
      <p className="text-2xl font-extrabold text-gray-400 mb-8 text-center max-w-3xl font-serif animate-fadeInSubheading">
        Dive into AI-powered Quizzes with mind-boggling multiple-choice questions.
      </p>

      {/* Play Button with Simple Hover Effect */}
      <Link
        to="/create-quiz"
        className="px-12 py-4 text-xl border border-white rounded-full text-white hover:bg-white hover:text-black transition duration-300 transform hover:scale-105"
      >
        Play
      </Link>
    </main>
    </>
  );
};

export default Home;
