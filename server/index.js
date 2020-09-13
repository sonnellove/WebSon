const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/joinroom', require('./routes/joinroom'));
app.use('/api/post', require('./routes/post'));
app.use('/api/video', require('./routes/video'));
app.use('/api/commentPost', require('./routes/commentPost'));

const { Chat } = require("./models/Chat");
const { JoinRoom } = require("./models/JoinRoom");
const { Post } = require("./models/Post")
const { Video } = require("./models/Video")
const { CommentPost } = require("./models/CommentPost")

io.on("connection", (socket) => {
  ///Chat
  console.log("io connected")

  socket.on('join', ({writer, name, room, variables }, callback) => {

    const { error, user } = addUser({ socketId: socket.id, name, roomId: variables.roomId, writer: variables.writer });
    console.log('user', user.writer)
    if (error) return callback(error);
    socket.join(user.roomId);

    connect.then(db => {
      try {
        let variable = {};
        variable = {writer: writer, room: room }
        const join = new JoinRoom(variable)
        JoinRoom.find({ "room": room })
          .exec((err, doc) => {
            if(doc[0] === undefined){
              join.save((err, doc) => {
                console.log(doc)
                if (err) return console.log(err)
              })
            }
          })
      } catch (error) {
        console.error(error);
      }
    })

    io.to(user.roomId).emit('roomData', getUsersInRoom(user.roomId));

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(message)
    connect.then(db => {
      try {
        let variable = {};
        variable = { roomId: user.roomId, message: message.message, writer: message.writer }
        const chat = new Chat(variable)
        chat.save((err, doc) => {
          console.log(doc)
          if (err) return console.log(err)
          Chat.find({ "_id": doc._id })
            .populate("writer")
            .exec((err, doc) => {
              console.log('--*****---')
              console.log('doc2:', doc)
              return io.to(user.roomId).emit('message', doc);
            })
        })
      } catch (error) {
        console.error(error);
      }
    })

    // io.to(user.room).emit('message', { user: user.name, text: message.message });
    callback();
  });

  socket.on('disconnect', () => {
    console.log("disconnected")
    const user = removeUser(socket.id);

    if (user) {
      console.log('*****', user)
      //   io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      // io.to(user.roomId).emit('roomData', getUsersInRoom(user.roomId));
    }
  })

  socket.on("saveComment", msg => {

    console.log('msg', msg)
    connect.then(db => {

      try {
        let variable = {};
        if (msg.responseTo) {
          variable = { writer: msg.writer, postId: msg.postId, content: msg.content, responseTo: msg.responseTo }
        } else {
          variable = { writer: msg.writer, postId: msg.postId, content: msg.content }
        }

        const comment = new CommentPost(variable)
        comment.save((err, doc) => {
          console.log(doc)
          if (err) return res.json({ success: false, err })
          CommentPost.find({ "_id": doc._id })
            .populate("writer")
            .exec((err, doc) => {
              // console.log('doc2:', doc)
              console.log('--*****---')
              return io.emit("saveComment", doc);
            })
        })
      } catch (error) {
        console.error(error);
      }
    })
  })


  socket.on("saveCommentVideos", msg => {
    console.log('msg', msg)
    connect.then(db => {

      try {
        let variable = {};
        if (msg.responseTo) {
          variable = { writer: msg.writer, videoId: msg.videoId, content: msg.content, responseTo: msg.responseTo }
        } else {
          variable = { writer: msg.writer, videoId: msg.videoId, content: msg.content }
        }

        const comment = new CommentPost(variable)
        comment.save((err, doc) => {
          console.log(doc)
          if (err) return res.json({ success: false, err })
          CommentPost.find({ "_id": doc._id })
            .populate("writer")
            .exec((err, doc) => {
              // console.log('doc2:', doc)
              console.log('--*****---')
              return io.emit("saveCommentVideos", doc);
            })
        })
      } catch (error) {
        console.error(error);
      }
    })
  })


  socket.on("Input Chat Message", msg => {

    connect.then(db => {
      try {

        chat.save((err, doc) => {
          console.log(doc)
          if (err) return res.json({ success: false, err })

          Chat.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc) => {

              return io.emit("Output Chat Message", doc);
            })
        })
      } catch (error) {
        console.error(error);
      }
    })
  })

  socket.on("uploadfiles", msg => {

    socket.join(socket.id)

    connect.then(db => {
      try {
        let variable = {};
        if (msg.images) {
          variable = { writer: msg.writer, description: msg.description, images: msg.images }
        } else {
          variable = { writer: msg.writer, description: msg.description }
        }
        let post = new Post(variable)

        post.save((err, doc) => {
          console.log(doc)
          if (err) return io.emit("Output uploadfiles", err);

          Post.find({ "_id": doc._id })
            .populate("writer")
            .exec((err, doc) => {
              if (err) return io.emit("Output uploadfiles", err);
              return io.emit("Output uploadfiles", doc);
            })
        })
      } catch (error) {
        console.error(error);
      }
    })
  })

  socket.on("uploadVideofiles", msg => {
    connect.then(db => {
      try {
        let variable = {};
        if (msg.videos) {
          variable = { writer: msg.writer, description: msg.description, videos: msg.videos }
        } else {
          variable = { writer: msg.writer, description: msg.description }
        }
        let video = new Video(variable)

        video.save((err, doc) => {
          console.log(doc)
          if (err) return io.emit("Output uploadVideofiles", err);

          Video.find({ "_id": doc._id })
            .populate("writer")
            .exec((err, doc) => {
              if (err) return io.emit("Output uploadVideofiles", err);
              return io.emit("Output uploadVideofiles", doc);
            })
        })
      } catch (error) {
        console.error(error);
      }
    })
  })


})


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('images'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});