import Post from '../models/post';

export async function getPosts(req, res) {
    try {
        const posts = await Post.findAll({
          where:{
            parent_id: null
        }
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

export async function getPostById(req, res) {
    try {
        const { id } = req.params;
        const post = await Post.findOne({
            where:{
                id
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

// export async function createPost(req, res) {
//     const { name } = req.body;

//     try {
//         let newArtist = await Artist.create({
//             name,
//         },
//             {
//                 fields: ['name']
//             });
//         if (newArtist) {
//             return res.json({
//                 message: 'Artist created successfully',
//                 data: newArtist
//             });
//         } 
//     } catch (err) {
//         res.status(500).json({
//             error: {
//                 code: "ERROR",
//                 http_code: 500,
//                 message: 'Something goes wrong' + err
//             }
//         });
//     }
// }

// export async function updateArtist(req, res) {
//     try {
//         const { id } = req.params;
//         const { name } = req.body;
//         const data = await Artist.findAll({
//             attributes: ['name'],
//             where: {
//                 id
//             }
//         });
//         if (data.length > 0) {
//             data.forEach(async Artist => {
//                 await Artist.update({
//                     name
//                 });
//             })
//         }

//         return res.json({
//             message: 'Artist updated successfully',
//             data: data
//         })
//     } catch (err) {
//         res.status(500).json({
//             error: {
//                 code: "ERROR",
//                 http_code: 500,
//                 message: 'Something goes wrong' + err
//             }
//         });
//     }
// }

// export async function deleteArtist(req, res) {
//     try {
//         const { id } = req.params;
//         const deleteRowCount = await Artist.destroy({
//             where: {
//                 id
//             }
//         });
//         res.json({ 
//             message: 'Artist deleted',
//             count: deleteRowCount
//         })
//     } catch (err) {
//         res.status(500).json({
//             error: {
//                 code: "ERROR",
//                 http_code: 500,
//                 message: 'Something goes wrong' + err
//             }
//         });

//     }
// }