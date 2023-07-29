const answers = require('../models/answers');

const postAnswer = async (req, res) => {
  const { answer, userId, questionId } = req.body;
  if (!answer) {
    return res.status(400).json({ error: 'Invalid answer format.' });
  }
  try {
    const newAnswer = await answers.create({
      answer,
      userId,
      questionId,
    });
    return res.status(201).json(newAnswer);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to insert the question into the database.' });
  }
};

const findAnswers = async (req, res) => {
  const questionId = req.params.id;
  try {
    const filteredQuestions = await answers.find({ questionId:questionId }).sort({ createdAt: 1 });;
    res.json(filteredQuestions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve answers from the database.' });
  }
};


module.exports = { postAnswer,findAnswers };
