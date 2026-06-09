import express from 'express';
import { banUser, dashboardStats, deleteUser, getUsers, updateProfile } from '../controllers/userController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/stats', authorize('admin'), dashboardStats);
router.get('/', authorize('admin'), getUsers);
router.put('/profile', upload.single('profileImage'), updateProfile);
router.patch('/:id/ban', authorize('admin'), banUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
