import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // name of the model/schema
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Task = mongoose.model("Task", schema);

export default Task;
