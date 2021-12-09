const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../db/userModel');
const {NotAuthorizedError} = require('../helpers/errors');

// user(email, password) => new User(email, password)
const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError('Wrong password');
  }
  const token = jwt.sign({
    _id: user._id,
    createdAt: user.createdAt,
  }, process.env.JWT_SECRET);

  return token;
};


module.exports = {
  registration,
  login,
};

