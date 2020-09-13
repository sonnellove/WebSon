import { Avatar } from "@material-ui/core";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import moment from "moment";
import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './CommentsVideos.css';

function CommentsVideos({ user, videoId, posts, comments }) {
  // const [Comment, setComment, resetComment] = useInputHooks("");
  // const [OpenReply, setOpenReply] = useState(false);
  // const [OpenReplyWrite, setOpenReplyWrite] = useState(false);
  // const [ChildCommentNumber, setChildCommentNumber] = useState(0)

  const commentPost = comments.comments && user.userData && comments.comments.map((comment, index) => {
    return (
      <React.Fragment key={index}>
        {videoId === comment.videoId &&
          <div className="commentVideos__container">
            <div className="commentVideos__post">
              <div className="commentVideos__header">
                <Link to={`/profile/${comment.writer._id}`}><Avatar src={`http://192.168.43.36:5000/${comment.writer.profile}`} className="commentVideos__avatar" /></Link>
                <div className="commentVideos__topInfo">
                  <h3>{comment.writer.name} {comment.writer.lastname}</h3>
                  <p>{moment(comment.createdAt).format("MMM Do YY")}</p>
                  <div className="commentVideos__bottom">
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>

              <div className="commentVideos__options">
                <div className="commentVideos__option">
                  <ThumbUpIcon />
                  <p>Like</p>
                </div>
                <div className="commentVideos__option">
                  <ChatBubbleOutlinedIcon />
                  <p>Reply</p>
                </div>
              </div>

            </div>
          </div>
        }
      </React.Fragment>
    )
  })
  return (
    <>{commentPost}</>
  )
}

const mapStateToProps = state => {

  return {
    user: state.user,
    posts: state.post,
    comments: state.comment
  }
}

export default connect(mapStateToProps)(CommentsVideos);