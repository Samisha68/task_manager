import { body } from 'express-validator';

export const taskValidators = [
  body('taskName')
    .trim()
    .notEmpty()
    .withMessage('Task name is required')
    .isLength({ max: 100 })
    .withMessage('Task name must be less than 100 characters'),
  body('taskDescription')
    .trim()
    .notEmpty()
    .withMessage('Task description is required'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  body('status')
    .optional()
    .isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status')
];