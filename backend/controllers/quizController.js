const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");
const QuizList = require("../models/QuizList");

// create new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = new Quiz({ title, questions, createdBy: req.userId });
    const savedQuiz = await quiz.save();
    const quizList = new QuizList({
      title,
      quizId: savedQuiz._id,
    });

    await quizList.save();
    res.status(201).json({ quiz });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizList.find();
    res.json({ quizzes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// take a quiz
exports.takeQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    const { answers, timeTaken } = req.body;

    const userId = req.userId; 
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // Calculate the score
    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });

    // Store the quiz result
    const quizResult = new QuizResult({
      quizId: quiz._id,
      userId,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers: score,
      wrongAnswers: quiz.questions.length - score,
      timeTaken:'5', 
    });

    await quizResult.save();

    res.json({
      message: "Quiz completed",
      score: score,
      totalQuestions: quiz.questions.length,
      correctAnswers: score,
      wrongAnswers: quiz.questions.length - score,
      timeTaken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get user wise quiz results
exports.getUserQuizResults = async (req, res) => {
  try {
    const userId = req.userId; 
    const results = await QuizResult.find({ userId }).populate(
      "quizId",
      "title"
    ); 
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
