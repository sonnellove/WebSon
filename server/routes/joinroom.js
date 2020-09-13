const express = require('express');
const router = express.Router();
const { JoinRoom } = require("../models/JoinRoom");
const multer = require("multer");
const fs = require("fs");
const { auth } = require("../middleware/auth");

router.post("/getJoinRooms", async (req, res) => {
  await JoinRoom.find()
    .populate('writer')
    .exec((err, JoinRooms) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(JoinRooms)
    })
});

module.exports = router;