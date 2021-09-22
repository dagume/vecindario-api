import Post from '../models/post';

// All parent Posts
export async function getPosts(req, res) {
    try {
        const posts = await Post.findAll({
            where:{
                parent_id: null
                },
                include : {
                    model : Post,
                    as: 'comments',
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
            });
        res.json({
            data: posts
        })
    } catch (err) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + err
            }
        })
    }
} 

// get post by ID
export async function getPostById(req, res) {
    try {
        // params
        const { id } = req.params;
        // find post
        const post = await Post.findOne({
            where:{
                id
            },
            include : {
                model : Post,
                as: 'comments',
            }
        });
        res.json({
            data: post
        })
    } catch (err) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + err
            }
        })
    }
}

// create a post
export async function createPost(req, res) {
    const { name, content, owner_email } = req.body;

    try {
        // create
        let newPost = await Post.create({
            name,
            content,
            owner_email,
        },
            {
                fields: ['name', 'content', 'owner_email']
            });
        if (newPost) {
            // return
            res.json({
                message: 'Post created successfully',
                data: newPost
            });
        } 
    } catch (err) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + err
            }
        });
    }
}

// Create a comment and count comments in the Post
export async function createComment(req, res) {
    const { parent_id, name, content, owner_email } = req.body;

    try {
        // Create
        let newComment = await Post.create({
            parent_id,
            name,
            content,
            owner_email,
        },
            {
                fields: ['parent_id', 'name', 'content', 'owner_email']
            });

        if (newComment) {
            // get parent_post
            let post = await Post.findOne({
                where:{
                    id: parent_id
                }
            });

            // comments counter
            let comment_counter = post.comment_counter + 1;

            // update comments counter
            await post.update({ comment_counter: comment_counter });

            // return
            res.json({
                message: 'Comment created successfully',
                data: newComment
            });
        } 
    } catch (err) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + err
            }
        });
    }
}
// add counter like in the Post
export async function addPostLike(req, res) {
    const { id } = req.body;
    let message = 'Error';
    
    try {
        
        // get post
        let post = await Post.findOne({
            where:{
                id: id,
                parent_id: null
            }
        });

        if (post) {
            // likes counter
            let like_counter = post.like_counter + 1;

            // update likes counter
            await post.update({ like_counter: like_counter });
            message = 'Liked';
        }
        // return
        res.json({
            message: message,
        });
        
    } catch (err) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + err
            }
        });
    }
}

// remove conuter like in the Post
export async function removePostLike(req, res) {
    const { id } = req.body;
    let message = 'Error';
    
    try {
        
        // get post
        let post = await Post.findOne({
            where:{
                id: id,
                parent_id: null
            }
        });
        
        if (post) {
            
            // likes counter
            let counter = post.like_counter - 1;

            // liking can't be negative value
            var like_counter = post.like_counter == 0 ? 0 : counter ;
            
            // update likes counter
            await post.update({ like_counter: like_counter });
            message = 'Liking was remove';
        }
        // return
        res.json({
            message: message,
        });
        
    } catch (err) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + err
            }
        });
    }
}

// add counter Dislike in the Post
export async function addPostDislike(req, res) {
    const { id } = req.body;
    let message = 'Error';
    
    try {
        
        // get post
        let post = await Post.findOne({
            where:{
                id: id,
                parent_id: null
            }
        });
        
        if (post) {
            // likes counter
            let dislike_counter = post.dislike_counter + 1;
            
            // update likes counter
            await post.update({ dislike_counter: dislike_counter });
            message = 'Disliked';
        }
        // return
        res.json({
            message: message,
        });
        
    } catch (err) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + err
            }
        });
    }
}

// remove conuter Dislike in the Post
export async function removePostDislike(req, res) {
    const { id } = req.body;
    let message = 'Error';
    
    try {
        
        // get post
        let post = await Post.findOne({
            where:{
                id: id,
                parent_id: null
            }
        });
        
        if (post) {
            
            // likes counter
            let counter = post.dislike_counter - 1;

            // liking can't be negative value
            var dislike_counter = post.dislike_counter == 0 ? 0 : counter ;
            
            // update likes counter
            await post.update({ dislike_counter: dislike_counter });
            message = 'Disliking was remove';
        }
        // return
        res.json({
            message: message,
        });
        
    } catch (err) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong' + err
            }
        });
    }
}