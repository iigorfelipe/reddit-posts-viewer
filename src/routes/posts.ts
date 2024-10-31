import { Router } from 'express';
import { validateDateAndOrderMiddleware, validateDateMiddleware } from '../middlewares/validation';
import { getPosts, getSortedPosts } from '../controllers/posts-controller';

const router = Router();

router.get('/', validateDateMiddleware, getPosts);
router.get('/sorted', validateDateAndOrderMiddleware, getSortedPosts);

export default router;
