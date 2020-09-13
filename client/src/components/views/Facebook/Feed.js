import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from "react-redux"
import io from 'socket.io-client'
import { afterCommentMessage, getComments } from '../../../_actions/comment_actions'
import { afterPostMessage, getPosts } from '../../../_actions/post_action'
import './Feed.css'
import StoryReel from './Feed/StoryReel'
import MessageSender from './MessageSender'
import Post from './Post'


const socket = io.connect(`http://192.168.43.36:5000/`)
function Feed({ comments, posts, user }) {
    const dispatch = useDispatch();
    const [PostSize, setPostSize] = useState()
    const image = require("../../../assets/images/Penguins.jpg");
    const profilePic = require("../../../assets/images/model-1.jpg");
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [postsa, setPosts] = useState([]);

    useEffect(() => {
        dispatch(getComments());
        socket.on('saveComment', messageFromBackEnd => {
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
        return () => {
            // socket.emit('disconnect')
            console.log('DISCONNECTED POST')
            socket.off();
        }
    }, [])

    const updateComment = (messageFromBackEnd) => {
        dispatch(afterCommentMessage(messageFromBackEnd));
    }

    const updatePost = (messageFromBackEnd) => {
        dispatch(afterPostMessage(messageFromBackEnd));
    }

    const getPost = (variables) => {

        setSkip(0)
        dispatch(getPosts(variables))
            .then((res) => {
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
            }, []);
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            // searchTerm: SearchTerms
        }
        getPost(variables)
        setSkip(skip)
    }

    return (
        <div className="feed__container">
            <div className="feed">
                {/* StoryReel */}
                <StoryReel />
                {/* MessageSender */}
                <MessageSender />
                {/* Post */}

                {user.userData && posts.posts && posts.posts.map((post, index) => (
                    <React.Fragment key={index}>
                        {/* <Post CommentOpen={CommentOpen} Skip={Skip} Limit={Limit} post={post} index={index} getPost={getPost} /> */}

                        <Post
                            comments={comments}
                            user={user}
                            username={post.writer.name}
                            profilePic={post.writer.image}
                            message={post.description}
                            timestamp={post.createdAt}
                            image={post.images}
                            postId={post._id}
                            userId={post.writer._id}
                        />
                    </React.Fragment>
                ))}
                {PostSize >= Limit &&
                    <div className="LoadMore">
                        <button onClick={onLoadMore}>Load More</button>
                    </div>
                }
            </div>
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

export default connect(mapStateToProps)(Feed);