import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController.js';

const router = express.Router();

const authValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];

router.post('/signup', authValidation, authController.signup);
router.post('/login', authValidation, authController.login);

export default router;
