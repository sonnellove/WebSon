import axios from 'axios';
import { JOIN_SERVER } from '../components/Config.js';
import { GET_ROOMS } from './types';

export function getJoinRooms(){
    const request = axios.post(`${JOIN_SERVER}/getJoinRooms`)
        .then(response => response.data);
    
    return {
        type: GET_ROOMS,
        payload: request
    }
}

// export function afterPostChatMessage(data){

//     return {
//         type: AFTER_POST_CHAT_MESSAGE,
//         payload: data
//     }
// }

