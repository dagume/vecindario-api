import { Router } from 'express';
const router = Router();

import * as postsCtrl from '../controllers/post.controller';

router.get('/', postsCtrl.getPosts);
router.get('/:id', postsCtrl.getPostById);
router.post('/', postsCtrl.createPost);
router.post('/comment', postsCtrl.createComment);

export default router;