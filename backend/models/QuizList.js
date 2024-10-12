const mongoose = require('mongoose');

const quizListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, 
});

module.exports = mongoose.model('QuizList', quizListSchema);
