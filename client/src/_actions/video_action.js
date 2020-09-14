import axios from 'axios';
import { VIDEO_SERVER } from '../components/Config.js';
import { AFTER_DELETEVIDEO_MESSAGE, AFTER_VIDEO_MESSAGE, GET_VIDEOS } from './types';


export function getVideos() {
    const request = axios.post(`${VIDEO_SERVER}/getVideos`)
        .then(response => response.data);

    return {
        type: GET_VIDEOS,
        payload: request
    }
}

export function afterVideoMessage(data) {
 
    return {
        type: AFTER_VIDEO_MESSAGE,
        payload: data
    }
}


export async function afterDeleteVideoMessage(variables) {
    const request = await axios.post(`${VIDEO_SERVER}/deleteOnePostVideos`, variables)
        .then(response => response.data);
    console.log('****AFTER_DELETEVIDEO_MESSAGE')
    console.log(request)
    return {
        type: AFTER_DELETEVIDEO_MESSAGE,
        payload: request
    }
}

