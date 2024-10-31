import express from 'express';
import { connectDB, disconnectDB } from './config/db';
import postsRoutes from './routes/posts';
import './scheduler/fetch-and-save-reddit-posts';

export const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/posts', postsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});