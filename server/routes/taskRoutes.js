import express from 'express';
import { body } from 'express-validator';
import {
  acceptTask,
  analytics,
  completeTask,
  createTask,
  deleteTask,
  getNearbyTasks,
  getTask,
  getTasks,
  updateTask
} from '../controllers/taskController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/analytics', authorize('admin'), analytics);
router.get('/nearby', authorize('volunteer', 'admin'), getNearbyTasks);
router
  .route('/')
  .get(getTasks)
  .post(
    authorize('seeker', 'admin', 'ngo'),
    [
      body('title').notEmpty(),
      body('description').notEmpty(),
      body('category').notEmpty(),
      body('address').notEmpty(),
      body('phone').notEmpty(),
      body('latitude').isNumeric(),
      body('longitude').isNumeric()
    ],
    validate,
    createTask
  );
router.route('/:id').get(getTask).put(authorize('seeker', 'admin'), updateTask).delete(authorize('admin'), deleteTask);
router.post('/:id/accept', authorize('volunteer'), acceptTask);
router.post('/:id/complete', authorize('volunteer', 'admin'), upload.single('proofImage'), completeTask);

export default router;
