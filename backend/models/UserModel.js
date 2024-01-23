import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: String
}, {timestamps: true})

export default mongoose.model('users', UserModel)