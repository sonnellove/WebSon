import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from "react-redux"
import io from 'socket.io-client'
import { afterPostMessage, getPosts } from '../../../../_actions/post_action'
import './FeedVideos.css'
import StoryReel from '../Feed/StoryReel'
import MessageSender from '../MessageSender'
import PostVideos from './PostVideos'
import Footer from '../Footer/Footer'
import MessageSenderVideos from './MessageSenderVideos'
import { afterCommentMessage, getComments, afterCommentVideoMessage } from '../../../../_actions/comment_actions'
import { getVideos, afterVideoMessage } from '../../../../_actions/video_action'


const socket = io.connect(`http://192.168.43.36:5000/`)
function FeedVideos({ videos, comments, posts, user }) {
    const dispatch = useDispatch();
    const [PostSize, setPostSize] = useState()
    const image = require("../../../../assets/images/Penguins.jpg");
    const profilePic = require("../../../../assets/images/model-1.jpg");
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [postsa, setPosts] = useState([]);

    useEffect(() => {
        dispatch(getVideos());
        dispatch(getComments());
        console.log('--*****---')
        socket.on('saveCommentVideos', messageFromBackEnd => {
            console.log('--2---')
            console.log(messageFromBackEnd)
            updateComment(messageFromBackEnd);
        })

        socket.on("Output uploadVideofiles", messageFromBackEnd => {
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
        dispatch(afterCommentVideoMessage(messageFromBackEnd));
    }

    const updatePost = (messageFromBackEnd) => {
        dispatch(afterVideoMessage(messageFromBackEnd));
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
            });
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
        <div className="feedVideos__container">
            <div className="feedVideos">
                {/* StoryReel */}
                {/* <StoryReel /> */}
                {/* MessageSender */}
                <MessageSenderVideos />
                {/* Post */}

                {user.userData && videos.videos && videos.videos.map((video, index) => (
                    <React.Fragment key={index}>
                        {/* <Post CommentOpen={CommentOpen} Skip={Skip} Limit={Limit} post={post} index={index} getPost={getPost} /> */}

                        <PostVideos
                            comments={comments}
                            user={user}
                            username={video.writer.name}
                            profilePic={video.writer.image}
                            message={video.description}
                            timestamp={video.createdAt}
                            video={video.videos}
                            videoId={video._id}
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
        comments: state.comment,
        videos: state.video
    }
}

export default connect(mapStateToProps)(FeedVideos);