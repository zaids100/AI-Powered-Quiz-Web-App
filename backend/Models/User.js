const mongoose = require('mongoose');

// Define the quiz history schema
const quizHistorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    score: { type: Number, required: true },
    total: {type :Number, required : true},
    date: { type: Date, default: Date.now }  // Date field to store the date of the quiz
  });

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    quizHistory: [quizHistorySchema] // Array of quiz entries
});

module.exports = mongoose.model('users', userSchema);
