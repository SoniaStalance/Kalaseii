import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        //return a state (note: state is immutable therfore we copy existing state and append to it) it is the array we se in redux dev tools
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id !== payload);
        default:
            return state;
    }
}