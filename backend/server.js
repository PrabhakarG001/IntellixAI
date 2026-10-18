import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';

dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)), quiet: true });
const PORT = process.env.PORT || 5000;
if (process.env.MONGODB_URI) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB');
  } catch {
    console.error('MongoDB connection failed. Check MONGODB_URI and database access.');
    process.exit(1);
  }
} else {
  console.warn('MONGODB_URI is unset. Chats use temporary memory storage and reset on restart.');
}
createApp().listen(PORT, () => console.log('Server listening on port ' + PORT));
