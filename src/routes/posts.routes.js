import { Router } from 'express';
const router = Router();

import * as postsCtrl from '../controllers/post.controller';

router.get('/', postsCtrl.getPosts);
router.get('/:id', postsCtrl.getPostById);
router.post('/', postsCtrl.createPost);
router.post('/comment', postsCtrl.createComment);
router.post('/add-like', postsCtrl.addPostLike);
router.post('/remove-like', postsCtrl.removePostLike);
router.post('/add-dislike', postsCtrl.addPostDislike);
router.post('/remove-dislike', postsCtrl.removePostDislike);


export default router;