import { AFTER_POST_MESSAGE, GET_POSTS,
    AFTER_DELETE_MESSAGE } from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, posts: action.payload.post, success: action.payload.success, postSize: action.payload.postSize }
        case AFTER_POST_MESSAGE:
            return { ...state, posts: action.payload.concat(state.posts) }
            case AFTER_DELETE_MESSAGE:
                return { ...state, posts: state.posts.filter(post => post._id !== action.payload.post._id) }
    
        default:
            return state;
    }
}