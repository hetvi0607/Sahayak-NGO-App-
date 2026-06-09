import express from 'express';
import { body } from 'express-validator';
import { exportCsv, submitSurvey, surveyAnalytics } from '../controllers/surveyController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post(
  '/',
  ['q1', 'q2', 'q3', 'q4', 'q5'].map((key) => body(key).isBoolean()),
  validate,
  submitSurvey
);
router.get('/analytics', protect, authorize('admin'), surveyAnalytics);
router.get('/export', protect, authorize('admin'), exportCsv);

export default router;
