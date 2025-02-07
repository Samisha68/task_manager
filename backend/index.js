import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "pending"
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});