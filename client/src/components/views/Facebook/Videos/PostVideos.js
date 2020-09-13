import { Avatar, Button, Input } from "@material-ui/core";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
import NearMeIcon from "@material-ui/icons/NearMe";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import useInputHooks from "../../../Hooks/useInputHooks";
import CommentsVideos from "./CommentsVideos";
import "./PostVideos.css";

const socket = io.connect(`http://192.168.43.36:5000/`)
function PostVideos({ comments, user, profilePic, video, username, timestamp, message, videoId }) {
  const [CommentHooks, setCommentHooks, resetCommentHooks] = useInputHooks("");
  const [OpenComment, setOpenComment] = useState(false);
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const videos = require("../../../../assets/images/1572677414277_Space - 21542.mp4");
  useEffect(() => {
    let commentNumber = 0;
    comments.comments && comments.comments.map((comment, index) => {
      if (!comment.responseTo && videoId === comment.videoId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  });


  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      videoId: videoId,
      content: CommentHooks,
    };
    if (variables.content !== "" && variables.writer) {
      socket.emit('saveCommentVideos', variables)
      resetCommentHooks();
    } else {
      alert("Login First")
    }
  };
  const CommentOpen = () => {
    setOpenComment(!OpenComment);
  };

  return (
    <div className="postVideos">
      <div className="postVideos__top">
        <Link to={`/profile/${user.userData._id}`}><Avatar src={profilePic} className="postVideos__avatar" /></Link>
        <div className="postVideos__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp).toUTCString()}</p>
        </div>
      </div>

      <div className="postVideos__bottom">
        <p>{message}</p>
      </div>
      {video &&
        <div className="postVideos__image">
          <video className="video" src={video} controls></video>
        </div>
      }
      {ChildCommentNumber !== 0 && (
        <p
          style={{
            display: " -webkit-inline-box",
            margin: "0 10px",
            cursor: "pointer",
          }}
          onClick={CommentOpen}
        >
          View {ChildCommentNumber} more comment(s)
        </p>
      )}
      <div className="postVideos__options">
        <div className="postVideos__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="postVideos__option"
          onClick={CommentOpen}
        >
          <ChatBubbleOutlinedIcon />
          <p>Comment</p>
        </div>
        <div className="postVideos__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
      </div>

      {/* Root Comment Form */}
      {OpenComment &&
        <>
          <CommentsVideos videoId={videoId} />
          <form className="commentForm" onSubmit={onSubmit}>
            <Input
              style={{ borderRadius: " 0 0 0 20px" }}
              {...setCommentHooks}
              placeholder="Write some comments"
            />
            <Button style={{ borderRadius: "0 0 10px" }} onClick={onSubmit}>
              Submit
        </Button>
          </form>
        </>
      }
    </div>
  );
}

export default PostVideos;
