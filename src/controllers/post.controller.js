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
