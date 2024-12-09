const router = require('express').Router();
const {addQuizHistory}=require('../Controllers/QuizHistoryController.js');
router.post('/add-quiz-history',addQuizHistory);

module.exports=router;