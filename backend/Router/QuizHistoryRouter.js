const router = require('express').Router();
const {addQuizHistory,getQuizHistory}=require('../Controllers/QuizHistoryController.js');
router.post('/add-quiz-history',addQuizHistory);
router.get('/get-quiz-history',getQuizHistory);
module.exports=router;