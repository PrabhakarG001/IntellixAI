import express from 'express';
import cors from 'cors';
import { createChatRouter } from './routes/chat.js';

export function createApp({ authenticate } = {}) {
  const chatRoutes = createChatRouter(authenticate);
  const app = express();
  const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173').split(',').map(s => s.trim());
  app.use(cors({ origin(origin, callback) {
    if (!origin || origins.includes(origin)) return callback(null, true);
    const error = new Error('Origin not allowed.');
    error.status = 403;
    callback(error);
  } }));
  app.use(express.json({ limit: '1mb' }));
  app.get('/', (req, res) => res.json({ status: 'ok' }));
  app.use('/api', chatRoutes);
  app.use('/api/intellix', chatRoutes);
  app.use((req, res) => res.status(404).json({ error: 'Endpoint not found.' }));
  app.use((error, req, res, next) => {
    const status = [400, 403, 413].includes(error.status) ? error.status : 500;
    res.status(status).json({ error: status === 413 ? 'Request body is too large.' : status === 400 ? 'Invalid JSON request.' : status === 403 ? 'Origin not allowed.' : 'Internal server error.' });
  });
  return app;
}
