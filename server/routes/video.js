const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Video } = require("../models/Video")
const multer = require('multer');

router.post("/uploadVideofiles", auth, (req, res) => {

    let variable = {};
    if (req.body.videos) {
        variable = { writer: req.body.writer, description: req.body.description, videos: req.body.videos }
    } else {
        variable = { writer: req.body.writer, description: req.body.description }
    }
    let video = new Video(variable)

    video.save((err, doc) => {
        if (err) return res.json({ success: false, err })

        Video.find({ "_id": doc._id })
            .populate("writer")
            .exec((err, doc) => {
                if (err) return res.json({ success: false, err })

                return res.status(200).json({ success: true, doc })
            })
    })
})

router.post("/getVideos", (req, res) => {

    let order = "desc";
    let sortBy = "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let term = req.body.searchTerm;

    if (term) {
        Video.find({})
            .find({ $text: { $search: term } })
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, video) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, video })
            })
    } else {
        Video.find({})
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, video) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, video, postSize: video.length })
            })
    }
})

router.post("/deleteOnePostVideos", (req, res) => {
    Video.findByIdAndDelete({ '_id': req.body.videoId })
        .exec((err, video) => {
            res.status(200).json({ success: true, video })
        })
})


module.exports = router;
