import {
  DislikeFilled, DislikeOutlined,


  LikeFilled, LikeOutlined
} from "@ant-design/icons";
import { Tooltip } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import io from 'socket.io-client'

const socket = io.connect(`http://localhost:5000`)
function LikeDislike({ postId, userId, commentId }) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};
  if (postId && userId ) {
    variable = { postId: postId, userId: userId };
  } else if(commentId && userId){
    variable = { commentId: commentId, userId: userId };
  }

  useEffect(() => {
    Axios.post("/api/LikePost/getLikes", variable).then((res) => {
      if (res.data.success) {
        //How many likes does this video or comment have
        setLikes(res.data.likes.length);

        //if I already click this like button or not
        res.data.likes.map((like) => {
          if (like.userId === userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    Axios.post("/api/LikePost/getDislikes", variable).then((res) => {
      if (res.data.success) {
        //How many likes does this video or comment have
        setDislikes(res.data.dislikes.length);
        //if I already click this like button or not
        res.data.dislikes.map((dislike) => {
          if (dislike.userId === userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);
  const onLike = () => {
    if (LikeAction === null) {
      // Axios.post("/api/LikePost/upLike", variable).then((res) => {
        socket.emit('uplike', variable)
        socket.on('uplike', doc => {
          console.log(doc)
        if (doc) {
          setLikes(Likes + 1);
          setLikeAction("liked");
          //If dislike button is already clicked
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("Faile to save Like");
        }
      });
    } else {
      Axios.post("/api/LikePost/unLike", variable).then((res) => {
        if (res.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Failed to decrease the like");
        }
      });
    }
  };

  const onDisLike = () => {
    if (DislikeAction !== null) {
      Axios.post("/api/LikePost/unDisLike", variable).then((res) => {
        if (res.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("Failed to decrease dislike");
        }
      });
    } else {
      Axios.post("/api/LikePost/upDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");

          //If dislike button is already clicked
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("Failed to increase dislike");
        }
      });
    }
  };
  return (
    <div className="LikeDislike">
      <span className="post-basic-like">
        <Tooltip title="Like">
          {LikeAction === "liked" ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      {/* <MessageFilled /> */}
      <span className="post-basic-dislike">
        <Tooltip title="Dislike">
          {DislikeAction === "disliked" ? (
            <DislikeFilled onClick={onDisLike} />
          ) : (
            <DislikeOutlined onClick={onDisLike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislike;
