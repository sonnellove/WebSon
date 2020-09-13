import { PictureOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Form from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import io from 'socket.io-client';
import { afterCommentMessage, afterPostMessage, getComments, getPosts } from "../../../_actions/post_action";
import useInputHooks from "../../Hooks/useInputHooks";
import FileUpload from "../../utils/FileUpload";
import Post from "./Post";
import SearchFeature from "./SearchFeature";

const socket = io.connect(`http://localhost:5000`)
function Timeline({ user, posts, comments }) {
    console.log('posts.post')
    console.log(posts.posts)
    const dispatch = useDispatch();
    const [postsa, setPosts] = useState([]);
    const [description, setDescription, resetDescription] = useInputHooks("");
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")
    const [CommentHooks, setCommentHooks, resetCommentHooks] = useInputHooks("");
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenComment, setOpenComment] = useState(false);
    const [images, setImages] = useState([]);
    const [openUploadimg, setOpenUploadimg] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();


        const variables = {
            writer: user.userData._id,
            description: description,
            images: images
        }
        console.log(variables)
        if (variables.images !== []) {
            socket.emit('uploadfiles', variables)
            resetDescription("")
            setOpenUploadimg(false)
            // setImages([])
        }

    }

    const updatePost = (messageFromBackEnd) => {
        dispatch(afterPostMessage(messageFromBackEnd));
    }
    const updateComment = (messageFromBackEnd) => {
        dispatch(afterCommentMessage(messageFromBackEnd));
    }

    useEffect(() => {
        dispatch(getComments());
        console.log('--*****---')
        socket.on('saveComment', messageFromBackEnd => {
            console.log('--2---')
            console.log(messageFromBackEnd)
            updateComment(messageFromBackEnd);
        })

        socket.on("Output uploadfiles", messageFromBackEnd => {
            console.log('messageFromBackEnd')
            console.log(messageFromBackEnd)
            updatePost(messageFromBackEnd)
        })
        const variables = {
            skip: Skip,
            limit: Limit
        }
        getPost(variables);
    }, [])

    const getPost = (variables) => {
        setSkip(0)
        dispatch(getPosts(variables))
            .then((res) => {
                // console.log(res.payload)
                if (res.payload.success) {
                    if (variables.loadMore) {
                        updatePost([...posts.posts]);
                    } else {
                        setPosts(res.payload.post);
                    }
                    setPostSize(res.payload.postSize)
                } else {
                    alert("Failed to get Post");
                }
            });
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            searchTerm: SearchTerms
        }
        getPost(variables)
        setSkip(skip)
    }


    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getPost(variables)
    }

    const CommentOpen = () => {
        setOpenComment(!OpenComment);
    };

    const openUpload = () => {
        setOpenUploadimg(!openUploadimg);
    };

    const updateImages = (newImages) => {
        setImages(newImages);
    };



    return (
        <>
            <div className="app__posts">
                <div className="app__posts__left">
                    <div>
                        <SearchFeature
                            refreshFunction={updateSearchTerms}
                        />
                    </div>
                    <div className="imguploada">
                        {/* <Link to="/upload">UplaodImages</Link> */}

                        <div style={{ paddingBottom: '30px', paddingTop: '10px' }}>
                            {/* <Form style={{ display: 'flex', height: '10px' }} onSubmit={onSubmit} > */}
                            <Form onSubmit={onSubmit} >
                                {openUploadimg &&
                                    <div>
                                        <FileUpload refreshFunction={updateImages} />
                                    </div>
                                }
                                <div style={{ textAlign: 'right' }}>
                                    <TextArea style={{ flex: 1 }} {...setDescription}
                                        placeholder="write some post"
                                    />

                                    <Button style={{ cursor: PictureOutlined }} onClick={openUpload}>Add<PictureOutlined /></Button>
                                    <Button style={{ flex: 0 }} onClick={onSubmit}>Submit</Button>

                                </div>
                            </Form>
                        </div>
                    </div>
                    {user.userData && posts.posts && posts.posts.map((post, index) => (
                        <React.Fragment key={index}>
                            <Post CommentOpen={CommentOpen} Skip={Skip} Limit={Limit} post={post} index={index} getPost={getPost} />
                            {/* <LikeDislike postId={post._id} userId={localStorage.getItem("userId")} /> */}
                            {/* {ChildCommentNumber !== 0 && ( */}

                            {/* {OpenComment &&
                                <Comments postId={post._id} />
                            } */}

                        </React.Fragment>
                    ))}

                    {PostSize >= Limit &&
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button onClick={onLoadMore}>Load More</button>
                        </div>
                    }
                </div>
                {/* <div className="app__posts__right">
          <RightPost imageUrl={backgroundImg} />
        </div> */}
            </div>
        </>
    );
}


const mapStateToProps = state => {

    return {
        user: state.user,
        posts: state.post,
        comments: state.comment
    }
}

export default connect(mapStateToProps)(Timeline);

