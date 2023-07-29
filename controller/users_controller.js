const users = require('../models/users')
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = new users({ username, password: hashedPassword });
      await newUser.save();
      res.send(newUser);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).send({ error: 'Username already exists' });
      } else {
        res.status(500).send({ error: 'An error occurred while creating the user' });
      }
    }
};

const checkUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await users.findOne({ username});
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(passwordMatch){
        res.status(200).send({ id:user._id});
      }
      else{
        res.status(404).send({ error: 'User not found' });
      }
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while searching for the user' });
  }
};

const findUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  try {
    const user = await users.findOne({ _id:userId })
    console.log(user)
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve questions from the database.' });
  }
};


module.exports = {createNewUser,checkUser,findUser}