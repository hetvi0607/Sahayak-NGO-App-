import express from 'express';
import { uploadProfile, uploadProof } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/profile', protect, upload.single('profileImage'), uploadProfile);
router.post('/proof', protect, upload.single('proofImage'), uploadProof);

export default router;
