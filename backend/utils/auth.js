import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const verifyUser = async (req, res, next) => {
  const match = /^Bearer (\S+)$/i.exec(req.headers.authorization || '');
  if (!match) return res.status(401).json({ error: 'Sign in to use chat.' });
  try {
    // Initialize lazily so environment variables are loaded before configuration.
    const app = getApps()[0] || initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || 'intellixai-3aaaf' });
    req.user = await getAuth(app).verifyIdToken(match[1]);
    next();
  } catch {
    res.status(401).json({ error: 'Your session is invalid or expired. Please sign in again.' });
  }
};
