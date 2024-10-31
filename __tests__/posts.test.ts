import request from 'supertest';
import { app } from '../src/index';
import { connectDB, disconnectDB } from '../src/config/db';
import { describe, beforeAll, it, expect, afterAll } from '@jest/globals';
import { RedditPostData } from '../src/types/posts';
import { startCronJob, stopCronJob } from '../src/scheduler/fetch-and-save-reddit-posts';

const start_date = '2024-10-01';
const end_date = '2024-10-31';

const expectedPostStructure = {
  id: expect.any(String),
  title: expect.any(String),
  author: expect.any(String),
  created_utc: expect.any(Number),
  ups: expect.any(Number),
  num_comments: expect.any(Number),
};

describe('Posts API', () => {
  beforeAll(async () => {
    await connectDB();
    startCronJob();
  });

  afterAll(async () => {
    stopCronJob();
    await disconnectDB();
  });

  it('GET /posts should return a list of posts', async () => {
    const response = await request(app).get('/posts').query({ start_date, end_date });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));

    const post = response.body[0] as RedditPostData;
    expect(post).toMatchObject(expectedPostStructure);

    const timestamps = response.body.map((post: RedditPostData) => post.created_utc);
    const sortedTimestamps = [...timestamps].sort((a, b) => b - a);
    expect(timestamps).toEqual(sortedTimestamps);
  });

  it('GET /posts/sorted should return a sorted list of posts', async () => {
    const responseUps = await request(app).get('/posts/sorted').query({ start_date, end_date, order: 'ups' });

    expect(responseUps.status).toBe(200);
    expect(responseUps.body).toEqual(expect.any(Array));

    const sortedPostUps = responseUps.body[0] as RedditPostData;
    expect(sortedPostUps).toMatchObject(expectedPostStructure);

    const upsArray = responseUps.body.map((post: RedditPostData) => post.ups);
    const sortedUpsArray = [...upsArray].sort((a, b) => b - a);
    expect(upsArray).toEqual(sortedUpsArray);

    const responseComments = await request(app)
      .get('/posts/sorted')
      .query({ start_date, end_date, order: 'comments' });

    expect(responseComments.status).toBe(200);
    expect(responseComments.body).toEqual(expect.any(Array));

    const sortedPostComments = responseComments.body[0] as RedditPostData;
    expect(sortedPostComments).toMatchObject(expectedPostStructure);

    const commentsArray = responseComments.body.map((post: RedditPostData) => post.num_comments);
    const sortedCommentsArray = [...commentsArray].sort((a, b) => b - a);
    expect(commentsArray).toEqual(sortedCommentsArray);
  });
});
