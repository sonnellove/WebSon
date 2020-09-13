import axios from 'axios';
import { POST_SERVER } from '../components/Config.js';
import { AFTER_POST_MESSAGE, GET_POSTS } from './types';

export function getPosts(variables) {
    const request = axios.post(`${POST_SERVER}/getPosts`, variables)
        .then(response => response.data);

    return {
        type: GET_POSTS,
        payload: request
    }
}

export function afterPostMessage(data) {
    // console.log('****afterPostMessage')
    // console.log(data)
    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}

