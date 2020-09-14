import { Avatar } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import VideocamIcon from "@material-ui/icons/Videocam";
import Axios from "axios";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { afterVideoMessage } from "../../../../_actions/video_action";
import "./MessageSenderVideos.css";

function MessageSenderVideos({ user }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [VideoUrl, setVideoUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      description: input,
      videos: VideoUrl
    }

    if (!variables.writer) {
      alert('Login First')

    } else if (variables.description === '') {
      alert('Fill in the blank')
    } else if (variables.writer && variables.description !== '') {
      Axios.post('/api/video/uploadVideofiles', variables)
        .then((res) => {
          updatePost(res.data.doc)
        })
      setInput("")
      setVideoUrl("")
    }
  };

  const updatePost = (messageFromBackEnd) => {
    dispatch(afterVideoMessage(messageFromBackEnd));
  }

  return (
    <div className="messageSenderVideos">
      <div className="messageSenderVideos__top">
        {user.userData && <Link to={`/profile/${user.userData._id}`}><Avatar src={user.userData.image} /></Link>}
        <form>
          <input
            className="messageSenderVideos__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`What's in your mind?`}
          />
          <input
            value={VideoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder={"Video URL (Optiona)"}
          />
          <button onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>
      <div className="messageSenderVideos__bottom">
        <div className="messageSenderVideos__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live</h3>
        </div>
        <div className="messageSenderVideos__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo</h3>
        </div>
        <div className="messageSenderVideos__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling</h3>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {

  return {
    user: state.user,
    posts: state.post,
    comments: state.comment
  }
}

export default connect(mapStateToProps)(MessageSenderVideos);