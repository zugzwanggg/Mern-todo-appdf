import mongoose from "mongoose";

const TodoModel = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('todo', TodoModel)