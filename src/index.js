import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { todoModel } from './models/todo-task.js';

const __dirname = path.resolve();
const app = express();

mongoose.connect('mongodb://localhost:27017/first-mongo');

app.use(express.static(path.resolve(__dirname, 'src/public')));
app.use(express.json());

app.post('/api/create', async (req, res) => {
  const { record } = req.body;

  if (!record) {
    return res.send({ err: 'no task description provided' });
  }

  const todo = new todoModel({
    record,
  });

  await todo.save();

  res.send({ status: 'ok', todo });
});

app.post('/api/modify', async (req, res) => {
  const { oldValue, newValue } = req.body;

  if (!newValue || !oldValue) {
    return res.send({ err: 'no task old/new value has provided' });
  }
  const todo = await todoModel.findOne({ record: oldValue });

  if (!todo) {
    return res.send({ err: 'no task with this name' });
  }

  todo.record = newValue;
  await todo.save();

  res.send({ status: 'ok', todo });
});

app.post('/api/delete', async (req, res) => {
  const { record } = req.body;

  if (!record) {
    return res.send({ err: 'no task record value has provided' });
  }

  const todo = await todoModel.deleteOne({ record });

  res.send({ status: 'ok', todo });
});

app.get('/api/get', async (req, res) => {
  const todoList = await todoModel.find();

  res.send(todoList);
});

app.listen(3000, () => {
  console.log('Server up');
});
