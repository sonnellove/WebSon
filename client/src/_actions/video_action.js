import axios from 'axios';
import { VIDEO_SERVER } from '../components/Config.js';
import { AFTER_VIDEO_MESSAGE, GET_VIDEOS } from './types';


export function getVideos() {
    const request = axios.post(`${VIDEO_SERVER}/getVideos`)
        .then(response => response.data);

    return {
        type: GET_VIDEOS,
        payload: request
    }
}

export function afterVideoMessage(data) {
    // console.log('****afterPostMessage')
    // console.log(data)
    return {
        type: AFTER_VIDEO_MESSAGE,
        payload: data
    }
}

