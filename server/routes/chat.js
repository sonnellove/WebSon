const express = require('express');
const router = express.Router();
const { Chat } = require("../models/Chat");
const multer = require("multer");
const fs = require("fs");
const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})
 
var upload = multer({ storage: storage }).single("file")

router.post("/api/chat/uploadfiles", auth ,(req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.path });
  })
});


router.post("/getChats",async (req, res) => {
  console.log('req.body:', req.body)
    await Chat.find({ 'roomId': req.body.room })
        .populate("writer")
        .exec((err, chats) => {
            // console.log(chats)
            if(err) return res.status(400).send(err);
            res.status(200).send(chats)
        })
});

module.exports = router;