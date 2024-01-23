import mongoose from "mongoose";

const UserModel = new mongoose.Schema({ 
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
}, {timestamps: true})

export default mongoose.model('user', UserModel)