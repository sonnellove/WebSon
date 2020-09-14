import { AFTER_DELETEVIDEO_MESSAGE, AFTER_VIDEO_MESSAGE, GET_VIDEOS } from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_VIDEOS:

            return { ...state, videos: action.payload.video, success: action.payload.success, postSize: action.payload.postSize }
        case AFTER_VIDEO_MESSAGE:
            return { ...state, videos: action.payload.concat(state.videos) }
        case AFTER_DELETEVIDEO_MESSAGE:
            return { ...state, videos: state.videos.filter(video => video._id !== action.payload.video._id) }

        default:
            return state;
    }
}