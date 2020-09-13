const express = require('express');
const router = express.Router();
const { CommentPost } = require('../models/CommentPost')

const { auth } = require("../middleware/auth");

// router.post("/saveComment", auth, (req, res) => {
//     const post = new CommentPost(req.body)

//     post.save((err, post) => {
//         if (err) return res.json({ success: false, err })

//         CommentPost.find({ '_id': post._id })
//             .populate('writer')
//             .exec((err, result) => {
//                 if (err) return res.json({ success: false, err })
//                 // console.log(result)
//                 return res.status(200).json({ success: true, result })
//             })
//     })
// })


// router.post("/getComments", (req, res) => {
//     CommentPost.find()
//     .populate('writer')
//     .exec((err, comments) => {
//         console.log(comments)
//         if (err) return res.status(400).send(err);
//             res.status(200).json({ success: true, comments })
//         })
// })
router.post("/getComments", (req, res) => {

    // console.log(res)
    CommentPost.find()
    .populate('writer')
        .exec((err, comments) => {
            // console.log(comments)
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});

module.exports = router;