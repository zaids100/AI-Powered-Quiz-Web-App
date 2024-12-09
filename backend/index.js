const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const authRouter = require('./Router/AuthRouter.js');
const quizHistory=require('./Router/QuizHistoryRouter.js');
// Connecting the database
const connectDB = require('./Config/db.js');
connectDB();

// Middlewares
app.use(express.json());  // Middleware for parsing JSON body
app.use(express.urlencoded({ extended: true }));  // Middleware for parsing URL-encoded data
app.use(cors({
    origin : ["https://ai-powered-quiz-web-app.onrender.com"],
    methods : ["GET","POST"],
    credentials : true
}));  // Cross-Origin Resource Sharing middleware

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the backend!',
        status: 'Success'
    });
});

app.use('/auth', authRouter);
app.use('/history',quizHistory);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
