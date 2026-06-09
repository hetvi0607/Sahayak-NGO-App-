import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger.js';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import taskRoutes from '../routes/taskRoutes.js';
import notificationRoutes from '../routes/notificationRoutes.js';
import categoryRoutes from '../routes/categoryRoutes.js';
import surveyRoutes from '../routes/surveyRoutes.js';
import ngoRoutes from '../routes/ngoRoutes.js';
import uploadRoutes from '../routes/uploadRoutes.js';
import aiRoutes from '../routes/aiRoutes.js';
import { errorHandler, notFound } from '../middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'SahayaK' }));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/ai', aiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
