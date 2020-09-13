import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

function FileUpload({ refreshFunction }) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("api/post/uploadImage", formData, config).then((response) => {
      if (response.data.success) {
        // setImages([...Images, response.data.image]);
        setImages([...Images, response.data.image]);
        refreshFunction([...Images, response.data.image]);
      } else {
        alert("Failed to save the Image in Server");
      }
    });
  };

  return (
    <div style={{ marginTop:'10px', display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "150px",
              height: "100px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: 'beige'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined type="plus" style={{ fontSize: "2rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "200px",
          height: "150px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div key={index}>
            <img
              style={{ minWidth: "200px", width: "200px", height: "150px" }}
              src={`http://localhost:5000/${image}`}
              alt={`postImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
