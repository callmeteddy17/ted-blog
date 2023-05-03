const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  userName: {
    type: String,
    require: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
