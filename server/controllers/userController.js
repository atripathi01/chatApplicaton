const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;
  
    const checkUserName = await User?.findOne({ username });
    if (checkUserName) {
      return res.status(422).json({ msg: 'Username already exists' });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(422).json({ error: 'Email already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      email,
      password: hashPassword,
    });

    delete user.password;
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    next(err);
    // return res.status(400).json({ error: 'something went wrong' });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(422).json({ msg: 'Invalid email or password' });
    }
    const isPassword = await bcrypt.compare(password, userExist.password);
    if (!isPassword) {
      return res.status(422).json({ msg: 'Invalid email or password' });
    }
    delete userExist.password;

    return res.status(201).json({ message: 'User loggedin successful', user:userExist });
  } catch (err) {
    next(err);
    // return res.status(400).json({ msg: 'something went wrong' });
  }
};

module.exports.getallUser = async (req, res, next) => {
    try {
      const user = await User.find({_id:{$ne: req.params.id}}).select(["email", "username", "_id", "avatarImg"]);
      return res.status(201).json({ message: 'List of all users', user });
    } catch (err) {
      next(err);
      // return res.status(400).json({ msg: 'something went wrong' });
    }
  };

