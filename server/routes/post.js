const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Post } = require("../models/Post")
const multer = require('multer');



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.example(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'))
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", auth, (req, res) => {
    // console.log(req)
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: req.file.filename })
    })
})


// router.post("/uploadfiles", auth, (req, res) => {
//     const post = new Post(req.body)

//     post.save((err, post) => {
//         if (err) return res.json({ success: false, err })
//         // console.log(post.writer)
//         Post.find({ '_id': post._id })
//             .populate('writer')
//             .exec((err, result) => {
//                 if (err) return res.json({ success: false, err })

//                 return res.status(200).json({ success: true, result })
//             })
//     })
// })


router.post("/getPosts", (req, res) => {

    let order = "desc";
    let sortBy = "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let term = req.body.searchTerm;

    if (term) {


        Post.find({})
            .find({ $text: { $search: term } })
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, post) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, post })
            })
    } else {
        Post.find({})
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, post) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, post, postSize: post.length })
            })
    }
})

router.post("/profile", (req, res) => {

    let order = "desc";
    let sortBy = "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    
    Post.find({ 'writer': req.body.writer })
        .populate('writer')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
})

router.post("/getOnePost", (req, res) => {

    Post.find({ '_id': req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
})

router.post("/updateOnePost", (req, res) => {

    Post.findOneAndUpdate({ '_id': req.body.postId },
        { description: req.body.updatePost },
        (err, updatePost) => {
            if (err) res.json({ success: false })
            if (updatePost) {
                Post.find({ '_id': req.body.postId })
                    .populate('writer')
                    .exec((err, post) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, post })
                    })

            }
        })
})

router.post("/deleteOnePost", (req, res) => {
    Post.findByIdAndDelete({ '_id': req.body.postId })
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            if (post) {

                let order = "desc";
                let sortBy = "_id";
                let limit = req.body.limit ? parseInt(req.body.limit) : 100;
                let skip = parseInt(req.body.skip);
                let term = req.body.searchTerm;
                let profileFolder = req.body.profileFolder;
                let profile_id = req.body.profile_id



                if (profileFolder) {
                    Post.find({ 'writer': req.body.writer })
                        .populate('writer')
                        .exec((err, post) => {
                            if (err) return res.status(400).send(err);
                            res.status(200).json({ success: true, post })
                        })
                } else {
                    Post.find({})
                        .populate('writer')
                        .sort([[sortBy, order]])
                        .skip(skip)
                        .limit(limit)
                        .exec((err, post) => {
                            if (err) return res.status(400).send(err);
                            res.status(200).json({ success: true, post, postSize: post.length })
                        })
                }
            }
        })
})
// router.post("/getOnePost", (req, res) => {
//     
//     Post.find({ '_id': req.body.postId })
//     .exec((err, post) => (req, res) =>)

// })
module.exports = router;
