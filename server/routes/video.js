const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Video } = require("../models/Video")
const multer = require('multer');

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

module.exports = router;
