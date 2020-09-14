import { GET_ROOMS } from '../_actions/types';
 
export default function(state={},action){
    switch(action.type){
        case GET_ROOMS:
            return {...state, rooms: action.payload }
        default:
            return state;
    }
}