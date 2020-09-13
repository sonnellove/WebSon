import { AFTER_VIDEO_MESSAGE, GET_VIDEOS } from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_VIDEOS:
            // console.log('GET_VIDEOS')
            // console.log(action.payload)
            return { ...state, videos: action.payload.video, success: action.payload.success, postSize: action.payload.postSize }
        case AFTER_VIDEO_MESSAGE:
            // console.log('AFTER_VIDEO_MESSAGE')
            // console.log(state.videos)
            // console.log(action.payload)
            return { ...state, videos: action.payload.concat(state.videos) }

        default:
            return state;
    }
}