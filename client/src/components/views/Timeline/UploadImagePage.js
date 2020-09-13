import { Button, Typography } from "antd";
import Form from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import io from 'socket.io-client';
import useInputHooks from "../../Hooks/useInputHooks";
import FileUpload from "../../utils/FileUpload";
import { afterPostMessage } from "../../../_actions/post_action";

const socket = io.connect(`http://localhost:5000`)
function UploadImagePage({ history, user }) {
  const { Title } = Typography;
  const [images, setImages] = useState([]);
  const [title, setTitle, resetTitle] = useInputHooks("");
  const [description, setDescription, resetDescription] = useInputHooks("");
  const dispatch = useDispatch();

  const updateImages = (newImages) => {
    setImages(newImages);
  };


  const onSubmit = (e) => {
    e.preventDefault();
    if (!description) return alert('fill all the fields first!')
    const variables = {
      writer: user.userData._id,
      title: title,
      description: description,
      images: images,
    };
    resetDescription("");
    socket.emit('uploadfiles', variables)

      history.push('/timeline')
      // updatePost(messageFromBackEnd)

  };
  
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Image Post</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        {/* <label>Title <br /></label>
        <Input {...setTitle} />
        <br />
        <br /> */}
        <label>Description</label>
        <TextArea {...setDescription} />
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

const mapStateToProps = state => {

  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(UploadImagePage);
