import axios from 'axios';
import { CHAT_SERVER } from '../components/Config.js';
import { AFTER_POST_CHAT_MESSAGE, GET_CHATS } from './types';

export function getChats(variables){
    const request = axios.post(`${CHAT_SERVER}/getChats`, variables)
        .then(response => response.data);
    
    return {
        type: GET_CHATS,
        payload: request
    }
}

export function afterPostChatMessage(data){

    return {
        type: AFTER_POST_CHAT_MESSAGE,
        payload: data
    }
}

