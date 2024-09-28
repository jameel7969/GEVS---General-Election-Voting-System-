const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
}

//signup user
const signupUser = async (req, res) => {
  const { email, password, name, dob, constituency, uvc } = req.body;


  try {
    let isAdmin = false;

    const adminEmail = "election@shangrila.gov.sr"; 
    if (email === adminEmail) {
      isAdmin = true;
    }

    const user = await User.signup(email, password, name, dob, constituency, uvc, isAdmin);

    const token = createToken(user._id);
    const id = user._id;
    const voted = user.voted;

    res.status(200).json({ email, token, id, voted, constituency, isAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error)
  }
}

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    const id = user._id;
    const voted = user.voted;
    const constituency = user.constituency;
    const isAdmin = user.isAdmin;

    res.status(200).json({ email, token, id, voted, constituency, isAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//voted request

const voted = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.voted = true;

    await user.save();

    const email = user.email;
    const token = createToken(user._id);
    const id = user._id;
    const voted = user.voted;
    const constituency = user.constituency;

    res.json({ email, token, id, voted, constituency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { signupUser, loginUser, voted }