import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  record: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
});

export const todoModel = mongoose.model('TodoModel', todoSchema);
