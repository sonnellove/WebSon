import { combineReducers } from 'redux';
import chat from './chat_reducer';
import comment from './comment_reducer';
import post from './post_reducer';
import user from './user_reducer';
import video from './video_reducer';
import join from './joinroom_reducer';

const rootReducer = combineReducers({
    user,
    chat,
    post,
    comment,
    video,
    join
});

export default rootReducer;