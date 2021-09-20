import { Router } from 'express';
const router = Router();

import * as postsCtrl from '../controllers/post.controller';

router.get('/', postsCtrl.getPosts);
router.get('/:id', postsCtrl.getPostById);
// router.post('/', postsCtrl.createPost);
// router.put('/:id', postsCtrl.updateArtist);
// router.delete('/:id', postsCtrl.deleteArtist);

export default router;