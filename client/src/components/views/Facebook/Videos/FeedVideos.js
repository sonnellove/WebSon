import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from "react-redux"
import io from 'socket.io-client'
import { afterCommentVideoMessage, getComments } from '../../../../_actions/comment_actions'
import { getPosts } from '../../../../_actions/post_action'
import { afterVideoMessage, getVideos } from '../../../../_actions/video_action'
import './FeedVideos.css'
import MessageSenderVideos from './MessageSenderVideos'
import PostVideos from './PostVideos'


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

        const variables = {
            skip: Skip,
            limit: Limit
        }
        getPost(variables);

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
                            userId={video.writer._id}
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