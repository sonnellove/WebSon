import {
    AFTER_COMMENT_MESSAGE,
    AFTER_COMMENT_VIDEO_MESSAGE, GET_COMMENT
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_COMMENT:
            return { ...state, comments: action.payload.comments, success: action.payload.success }
        case AFTER_COMMENT_MESSAGE:
            return { ...state, comments: state.comments.concat(action.payload) }
        case AFTER_COMMENT_VIDEO_MESSAGE:
            return { ...state, comments: state.comments.concat(action.payload) }
        default:
            return state;
    }
}