import { AFTER_POST_MESSAGE, GET_POSTS } from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            console.log('GET_POSTS')
            console.log(action.payload)
            return { ...state, posts: action.payload.post, success: action.payload.success, postSize: action.payload.postSize }
        case AFTER_POST_MESSAGE:
            console.log('AFTER_POST_MESSAGE')
            console.log(state.posts)
            console.log(action.payload)
            return { ...state, posts: action.payload.concat(state.posts) }

        default:
            return state;
    }
}