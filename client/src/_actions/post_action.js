import axios from 'axios';
import { POST_SERVER } from '../components/Config.js';
import { AFTER_DELETE_MESSAGE, AFTER_POST_MESSAGE, GET_POSTS } from './types';

export function getPosts(variables) {
    const request = axios.post(`${POST_SERVER}/getPosts`, variables)
        .then(response => response.data);

    return {
        type: GET_POSTS,
        payload: request
    }
}

export function afterPostMessage(data) {

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}

export async function afterDeleteMessage(variables) {
    const request = await axios.post(`${POST_SERVER}/deleteOnePost`, variables)
        .then(response => response.data);

    return {
        type: AFTER_DELETE_MESSAGE,
        payload: request
    }
}

