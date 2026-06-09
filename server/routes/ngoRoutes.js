import express from 'express';
import { getNgos, ngoReport, registerNgo } from '../controllers/ngoController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerNgo);
router.get('/', protect, authorize('admin'), getNgos);
router.get('/:id/report', protect, authorize('admin', 'ngo'), ngoReport);

export default router;
