const express = require('express');
const router = express.Router();
const { LikePost } = require("../_models/LikePost")
const { DislikePost } = require("../_models/DislikePost")

const { auth } = require("../middleware/auth");

router.post("/getLikes", (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    LikePost.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
})

router.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    DislikePost.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})

// router.post("/upLike", auth, (req, res) => {

//     // console.log('uplike******')
//     // console.log(req.body)
//     let variable = {}
//     if (req.body.postId) {
//         variable = { postId: req.body.postId, userId: req.body.userId }
//     } else {
//         variable = { commentId: req.body.postId, commentId: req.body.userId }
//     }

//     const like = new LikePost(variable)
//     //save the like information data in MongoDB
//     like.save((err, likeResult) => {
//         if (err) return res.json({ success: false, err });
//         //In case disLike Button is already clicked, we need to decrease the dislike by 1 
//         DislikePost.findOneAndDelete(variable)
//             .exec((err, dislikeResult) => {
//                 if (err) return res.status(400).json({ success: false, err })
//                 res.status(200).json({ success: true })
//                 console.log('success')
//             })
//     })
// })

router.post("/unLike", auth, (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.postId, commentId: req.body.userId }
    }

    LikePost.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
})

router.post("/unDisLike", auth, (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    DislikePost.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })


})

router.post("/upDisLike", auth, (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const disLike = new DislikePost(variable)
    //save the like information data in MongoDB
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        //In case Like Button is already clicked, we need to decrease the like by 1 
        LikePost.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })


})
module.exports = router;
