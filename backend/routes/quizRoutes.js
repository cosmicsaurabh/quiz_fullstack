const express = require('express');
const { createQuiz, getAllQuizzes, getQuizById, takeQuiz,getUserQuizResults,} = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/quizzes',authMiddleware,getAllQuizzes);                
router.post('/create', authMiddleware, createQuiz);  
router.get('/results',authMiddleware, getUserQuizResults);
router.get('/:quizId', authMiddleware,getQuizById);           
router.post('/:quizId/take',authMiddleware, takeQuiz);       

module.exports = router;
