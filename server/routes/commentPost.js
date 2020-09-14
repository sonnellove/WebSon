const express = require('express');
const router = express.Router();
const { CommentPost } = require('../models/CommentPost')

const { auth } = require("../middleware/auth");

router.post("/saveComment", auth, (req, res) => {
    let variable = {};
    if (req.body.responseTo) {
        variable = { writer: req.body.writer, postId: req.body.postId, content: req.body.content, responseTo: req.body.responseTo }
    } else {
        variable = { writer: req.body.writer, postId: req.body.postId, content: req.body.content }
    }
    const post = new CommentPost(variable)

    post.save((err, result) => {
        if (err) return res.json({ success: false, err })

        CommentPost.find({ '_id': result._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})

router.post("/saveCommentVideos", auth, (req, res) => {
    let variable = {};
    if (req.body.responseTo) {
        variable = { writer: req.body.writer, videoId: req.body.videoId, content: req.body.content, responseTo: req.body.responseTo }
    } else {
        variable = { writer: req.body.writer, videoId: req.body.videoId, content: req.body.content }
    }
    const post = new CommentPost(variable)

    post.save((err, result) => {
        if (err) return res.json({ success: false, err })

        CommentPost.find({ '_id': result._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})


// router.post("/getComments", (req, res) => {
//     CommentPost.find()
//     .populate('writer')
//     .exec((err, comments) => {
//         if (err) return res.status(400).send(err);
//             res.status(200).json({ success: true, comments })
//         })
// })
router.post("/getComments", (req, res) => {
    CommentPost.find()
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});

module.exports = router;