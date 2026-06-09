import express from 'express';
import { futureModules } from '../controllers/aiController.js';

const router = express.Router();

router.get('/future-modules', futureModules);
router.post('/scheme-recommendation', futureModules);
router.post('/task-categorization', futureModules);
router.post('/whatsapp-bot', futureModules);
router.post('/voice-request', futureModules);

export default router;
