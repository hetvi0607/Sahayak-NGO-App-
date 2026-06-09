import express from 'express';
import { body } from 'express-validator';
import { forgotPassword, login, me, register, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register seeker, volunteer, admin, or NGO user
 */
router.post(
  '/register',
  [
    body('name').isLength({ min: 2 }),
    body('email').isEmail(),
    body('phone').notEmpty(),
    body('password').isLength({ min: 6 }),
    body('role').optional().isIn(['seeker', 'volunteer', 'admin', 'ngo'])
  ],
  validate,
  register
);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, login);
router.get('/me', protect, me);
router.post('/forgot-password', [body('email').isEmail()], validate, forgotPassword);
router.post('/reset-password/:token', [body('password').isLength({ min: 6 })], validate, resetPassword);

export default router;
