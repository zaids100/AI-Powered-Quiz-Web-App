const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const authRouter = require('./Router/AuthRouter.js');
const quizHistory=require('./Router/quizHistoryRouter.js');
// Connecting the database
const connectDB = require('./Config/db.js');
connectDB();

// Middlewares
app.options('*', cors()); // Allow preflight requests for all routes
const corsOptions = {
  origin: 'https://ai-powered-quiz-web-app-u187.vercel.app', // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies if required
};

app.use(cors(corsOptions));
app.use(express.json());  // Middleware for parsing JSON body
app.use(express.urlencoded({ extended: true }));  // Middleware for parsing URL-encoded data
// app.use(cors({
//     origin : ["https://ai-powered-quiz-web-app-u187.vercel.app"],
//     methods : ["POST","GET"],
//     credentials : true
// }));  // Cross-Origin Resource Sharing middleware

// app.use('/',()=>{
//     res.send("Hello From Server");
// })
// Routes
app.use('/auth', authRouter);
app.use('/history',quizHistory);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
