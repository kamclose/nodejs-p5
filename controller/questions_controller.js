const questions = require('../models/questions');

const postQuestion = async (req, res) => {
  const { question, userId, categoryId } = req.body;
  if (!question || !question.endsWith('?')) {
    return res.status(400).json({ error: 'Invalid question format. The question should not be empty and should end with a question mark.' });
  }

  try {
    const newQuestion = await questions.create({
      question,
      userId,
      categoryId,
    });
    return res.status(201).json(newQuestion);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to insert the question into the database.' });
  }
};

const findQuestions = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const filteredQuestions = await questions.find({ categoryId }).sort({ createdAt: 1 });;
    res.json(filteredQuestions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve questions from the database.' });
  }
};


module.exports = { postQuestion,findQuestions };
