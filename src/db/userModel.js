const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  title: String,
  bio: String,
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function() {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  };
  // TODO: if user changed his password
});


const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
