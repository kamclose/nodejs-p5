const categories = require('../models/categories')

const findCategories = async (req, res) => {
  try {
    const allCategories = await categories.find();
    res.json(allCategories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve categories from the database.' });
  }
};

module.exports = { findCategories };