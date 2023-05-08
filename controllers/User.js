
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const signup = async (req, res) => {
 try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email " });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// exports.logout = async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
//     await req.user.save();
//     res.json({ message: 'Logout successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// exports.logoutAll = async (req, res) => {
//   try {
//     req.user.tokens = [];
//     await req.user.save();
//     res.json({ message: 'Logout from all devices successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error:err});
// }};


const getUser = async (req, res) => {
  try{
  const user = await User.findById(req.user.user_id);
  if (!user) {
    return res.status(400).send("no such user exists... ");
  }
          user.password = undefined;
  return res.status(StatusCodes.OK).json({ success: true, user });
}
catch(err){
  res.status(401).json({
            success: false,
            message: err.message,})
}}
;

// function validate(req) {
//   const schema = {
//     email: joi.string().email().required(),
//     password: joi.string().min(5).max(80).required(),
//   };
//   return joi.validate(req, schema);
// }
module.exports = { login, signup, getUser };
