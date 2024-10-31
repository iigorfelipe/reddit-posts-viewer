import axios from 'axios';
import { schedule } from 'node-cron';
import connectDB from '../config/db';
import { Posts } from '../models/posts';

const DAILY_AT_10AM = '0 10 * * *'; // Uma vez ao dia, às 10h da manhã

const fetchRedditPosts = async () => {
  try {
    const url = 'https://api.reddit.com/r/artificial/hot';
    const response = await axios.get(url);
    const posts = response.data.data.children;

    for (const post of posts) {
      const postId = post.data.id;
      const postData = {
        title: post.data.title,
        author: post.data.author,
        created_utc: post.data.created_utc,
        ups: post.data.ups,
        num_comments: post.data.num_comments,
      };

      const existingPost = await Posts.findOne({ id: postId });

      if (existingPost) {
        await Posts.updateOne({ id: postId }, postData);
      } else {
        const newPost = new Posts({ id: postId, ...postData });
        await newPost.save();
      }
    }
    console.log('Posts saved successfully');
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const startScheduler = () => schedule(DAILY_AT_10AM, fetchRedditPosts);

const main = async () => {
  await connectDB();
  startScheduler();
};

main();
