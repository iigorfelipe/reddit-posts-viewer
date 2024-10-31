import mongoose from 'mongoose';

const PostsSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  author: String,
  created_utc: Number,
  ups: Number,
  num_comments: Number,
});

export const Posts = mongoose.model('reddit_hot_posts', PostsSchema);
