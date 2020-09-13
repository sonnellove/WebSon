import { AFTER_POST_CHAT_MESSAGE, GET_CHATS } from '../_actions/types';
 
export default function(state={},action){
    switch(action.type){
        case GET_CHATS:
            console.log('GET_POSTS')
            console.log(action.payload)
            return {...state, chats: action.payload }
        case AFTER_POST_CHAT_MESSAGE:
            console.log('AFTER_POST_CHAT_MESSAGE')
            console.log(state.chats)
            console.log(action.payload)
                return {...state, chats: state.chats.concat(action.payload) }
        default:
            return state;
    }
}