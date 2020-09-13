import { Avatar, Button, Input } from 'antd';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import useInputHooks from '../../Hooks/useInputHooks';
import ImageSlider from '../../utils/ImageSlider';
import Comments from './Comments';
import DeletePost from './DeletePost';

const socket = io.connect(`http://localhost:5000`)
function Post({ comments, Skip, Limit, getPost, user, posts, index, post }) {
    const [CommentHooks, setCommentHooks, resetCommentHooks] = useInputHooks("");
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenComment, setOpenComment] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        comments.comments && comments.comments.map((comment, index) => {
          if (!comment.responseTo && post._id === comment.postId) {
            commentNumber++;
          }
        });
        setChildCommentNumber(commentNumber);
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            writer: user.userData._id,
            postId: post._id,
            content: CommentHooks,
        };
        if (variables.content !== "") {
            socket.emit('saveComment', variables)
            resetCommentHooks();
        }
    };
    const CommentOpen = () => {
        setOpenComment(!OpenComment);
    };

    return (
        <div className="post">
            {/* header -> avatar = username */}
            <div className="post__header">
                {/* {post.writer.profile[0] ? ( */}
                {true ? (
                    <Avatar
                        className="post__avatar"
                        alt={post.writer.name}
                        src={`http://localhost:5000/${post.writer.profile}`}
                    />
                ) : (
                        <Avatar className="post__avatar" alt={post.writer.name} />
                    )}
                {/* <img className="post__image" src={`http://localhost:5000/${image}`} alt={`postImg-${index}`} /> */}
                <h3>
                    {/* {posts.posts && post.writer._id && user.userData._id === post.writer._id ? ( */}
                    {user.userData && post.writer && user.userData._id === post.writer._id ? (
                        <>
                            <strong>
                                <span>
                                    <Link to={`/editProfile`}>Edit</Link>
                                </span>{" "}
                                <span style={{ marginLeft: "190px", cursor: "pointer" }}>
                                    <Link to={`/updatePost/${post._id}`}>Update</Link>
                                </span>{" "}
                                <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                                    <DeletePost
                                        Skip={Skip} Limit={Limit} getPost={getPost}
                                        // setPosts={posts.posts}
                                        postId={post._id}
                                    // profileFolder={profileFolder}
                                    />
                                </span>{" "}
                                <br />{" "}
                                <Link to={`/timeline/${post.writer._id}`}>
                                    {post.writer.name} {post.writer.lastname}
                                </Link>
                            </strong>{" "}
                        </>
                    ) : (
                            <Link to={`/timeline/${post.writer._id}`}>
                                {post.writer.name} {post.writer.lastname}
                            </Link>
                        )}

                    <br />
                    {moment(post.createdAt).format("MMM Do YY")}
                </h3>
            </div>
            
            {/* image */}
            {post.images.length !== 0 ? (
                post.images.length === 1 ? (
                    <div>
                        <Link to={`/image/${post._id}`}>
                            {" "}
                            <ImageSlider images={post.images} />{" "}
                        </Link>
                    </div>
                ) : (
                        <div style={{ overflowX: "scroll" }}>
                            <Link to={`/image/${post._id}`}>
                                {" "}
                                <ImageSlider images={post.images} />{" "}
                            </Link>
                        </div>
                    )
            ) : (
                    <></>
                )}
            {/* username + caption + */}

            <h4 className="post__text">
                {" "}
                <p>{post.description}</p>
            </h4>
            {true && (
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
            {OpenComment &&
                <Comments postId={post._id} />
            }
            {/* Root Comment Form */}
            <form style={{ display: "flex" }} onSubmit={onSubmit}>
                <Input
                    style={{ borderRadius: " 0 0 0 20px" }}
                    {...setCommentHooks}
                    placeholder="Write some comments"
                />
                <Button style={{ borderRadius: "0 0 10px" }} onClick={onSubmit}>
                    Submit
                            </Button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        user: state.user,
        posts: state.post,
        comments: state.comment
    }
}

export default connect(mapStateToProps)(Post);

