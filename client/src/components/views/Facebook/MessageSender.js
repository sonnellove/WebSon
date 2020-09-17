import { Avatar } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import VideocamIcon from "@material-ui/icons/Videocam";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import io from 'socket.io-client';
import { afterPostMessage } from "../../../_actions/post_action";
import "./MessageSender.css";
import { Link } from "react-router-dom";
import Axios from "axios";

function MessageSender({ user }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      description: input,
      images: imageUrl
    }

    if (!variables.writer) {
      alert('Login First')

    } else if (variables.description === '') {
      alert('Fill in the blank')
    } else if (variables.writer && variables.description !== '') {
      Axios.post('/api/post/uploadfiles', variables)
      .then((res)=>{
        updatePost(res.data.doc)
      })
      setInput("")
      setImageUrl("")
    }
  };

  const handleSubmitPhoto = (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      description: input,
      images: imageUrl
    }

    if (!variables.writer) {
      alert('Login First')

    }else{
      alert('Under Maintenance')
    }
  }
  const updatePost = (messageFromBackEnd) => {
    dispatch(afterPostMessage(messageFromBackEnd));
  }

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        {user.userData && <Link to={`/profile/${user.userData._id}`}><Avatar src={user.userData.image} /></Link>}
        <form>
          <input
            className="messageSender__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`What's in your mind?`}
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder={"image URL (Optiona)"}
          />
          <button onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3 onClick={handleSubmitPhoto} type="submit">Live</h3>
        </div>
        <form>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3 onClick={handleSubmitPhoto} type="submit"> Photo </h3>
        </div>
        </form>
        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3 onClick={handleSubmitPhoto} type="submit">Feeling</h3>
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

export default connect(mapStateToProps)(MessageSender);