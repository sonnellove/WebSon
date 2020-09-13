import { Avatar } from 'antd';
import moment from "moment";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import useInputHooks from '../../Hooks/useInputHooks';

function Comments({ user, postId, posts, comments }) {
  // const [Comment, setComment, resetComment] = useInputHooks("");
  // const [OpenReply, setOpenReply] = useState(false);
  // const [OpenReplyWrite, setOpenReplyWrite] = useState(false);
  // const [ChildCommentNumber, setChildCommentNumber] = useState(0)

  const commentPost = comments.comments && user.userData && comments.comments.map((comment, index) => {
    console.log(comment.content)
    return (
      <React.Fragment key={index}>
        {postId === comment.postId &&
          <div className="post__comment">
            <div className="post__comment__container">
              <div className="post__header">
                <Avatar className="post__avatar" alt={comment.writer.name} src={`https://raw.githubusercontent.com/sonnellove/nelftube/master/${comment.writer.profile}`} />
                <h3>
                  <strong>
                    <Link to={`/timeline/${comment.writer._id}`}>{comment.writer.name} {comment.writer.lastname}</Link>
                  </strong>{" "}<br />
                  {moment(comment.createdAt).format("MMM Do YY")}
                </h3>
              </div>
              <div style={{ marginLeft: '3rem' }}>
                <p className="post__comment_msg">{comment.content}</p>
              </div>
              <div className="showReply">
                {/* <LikeDislike commentId = {commentId} /> */}
                {/* <LikeDislike postId={commentId} userId={localStorage.getItem('userId')} />
                
                <h3 onClick={OpenReplies}>
                  <MessageFilledHook title={"reply"} />
                </h3> */}
              </div>
              {/* {ChildCommentNumber !== 0 &&
                <p style={{ marginBottom: 0, margin: ' -10px 0 0 10px' }} onClick={OpenReplies}>View {ChildCommentNumber} more reply(ies)</p>
              } */}
              
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

export default connect(mapStateToProps)(Comments);