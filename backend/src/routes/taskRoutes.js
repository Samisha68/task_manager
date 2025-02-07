import express from 'express';
import { body } from 'express-validator';
import taskController from '../controllers/taskController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const taskValidation = [
  body('taskName').notEmpty().trim(),
  body('taskDescription').notEmpty().trim(),
  body('dueDate').optional().isISO8601(),
  body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
];

router.use(authMiddleware);

router.get('/', taskController.getAllTasks);
router.post('/', taskValidation, taskController.createTask);
router.put('/:id', taskValidation, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;