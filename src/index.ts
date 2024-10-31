import express from 'express';
import connectDB from './config/db';
import postsRoute from './routes/posts';
import sortedPostsRoute from './routes/sorted-posts';
import './scheduler/fetch-and-save-reddit-posts';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/posts', postsRoute);
app.use('/posts/sorted', sortedPostsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
