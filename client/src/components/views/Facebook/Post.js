import { Avatar, Button, Input } from "@material-ui/core";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
import NearMeIcon from "@material-ui/icons/NearMe";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import useInputHooks from "../../Hooks/useInputHooks";
import ImageSlider from "../../utils/ImageSlider";
import Comments from "./Comments";
import "./Post.css";

const socket = io.connect(`http://192.168.43.36:5000/`)
function Post({ userId, comments, user, profilePic, image, username, timestamp, message, postId }) {
  const [CommentHooks, setCommentHooks, resetCommentHooks] = useInputHooks("");
  const [OpenComment, setOpenComment] = useState(false);
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);

  useEffect(() => {
    let commentNumber = 0;
    comments.comments && comments.comments.map((comment, index) => {
      if (!comment.responseTo && postId === comment.postId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  });


  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      postId: postId,
      content: CommentHooks,
    };
    if (variables.content !== "" && variables.writer) {
      socket.emit('saveComment', variables)
      resetCommentHooks();
    }else{
      alert("Login First")
    }
  };
  const CommentOpen = () => {
    setOpenComment(!OpenComment);
  };

  return (
    <div className="post">
      <div className="post__top">
      <Link to={`/profile/${userId}`}><Avatar src={profilePic} className="post__avatar" /></Link>
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp).toUTCString()}</p>
        </div>
      </div>
     
      <div className="post__bottom">
        <p>{message}</p>
      </div>
      <div className="post__image">

        {/* image */}
        {image.length !== 0 ? (
          image.length === 1 ? (
            <div>
              <Link to={`/image/${postId}`}>
                {" "}
                <ImageSlider images={image} />{" "}
              </Link>
            </div>
          ) : (
              <div style={{ overflowX: "scroll" }}>
                <Link to={`/image/${postId}`}>
                  {" "}
                  <ImageSlider images={image} />{" "}
                </Link>
              </div>
            )
        ) : (
            <></>
          )}

      </div>
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
      <div className="post__options">
        <div className="post__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="post__option"
          onClick={CommentOpen}
        >
          <ChatBubbleOutlinedIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
      </div>

      {/* Root Comment Form */}
      {OpenComment &&
        <>
          <Comments postId={postId} />
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

export default Post;
