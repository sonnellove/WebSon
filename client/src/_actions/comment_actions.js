import axios from 'axios';
import { COMMENT_SERVER } from '../components/Config.js';
import { AFTER_COMMENT_MESSAGE, AFTER_COMMENT_VIDEO_MESSAGE, GET_COMMENT } from './types';


export function getComments() {
    const request = axios.post(`${COMMENT_SERVER}/getComments`)
        .then(response => response.data);

    return {
        type: GET_COMMENT,
        payload: request
    }
}

export function afterCommentMessage(data) {

    return {
        type: AFTER_COMMENT_MESSAGE,
        payload: data
    }
}

export function afterCommentVideoMessage(data) {

    return {
        type: AFTER_COMMENT_VIDEO_MESSAGE,
        payload: data
    }
}


