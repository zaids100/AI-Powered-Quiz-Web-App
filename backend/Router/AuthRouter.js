const { signup, login } = require('../Controllers/AuthController.js');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation.js');
const { getQuizData } = require('../Controllers/GeminiController.js');

const router = require('express').Router();

// User authentication routes
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// Quiz data route (POST request because we're sending data in the body)
router.post('/quiz-box', getQuizData);
module.exports = router;
