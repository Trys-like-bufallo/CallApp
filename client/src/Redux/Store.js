import {createStore} from 'redux';
var initialState = {
    callStatus: '',
    index: 0,
}

const Reducer = (state = initialState, action) => {
    switch (action.type){
        case 'disable':
            return Object.assign({}, state , {callStatus: ''});
        case 'calling':
            return Object.assign({}, state, {callStatus: 'Calling...'});
        case 'error':
            return Object.assign({}, state, {callStatus: 'Phone number empty !!!'});
        case 'ended':
            return Object.assign({}, state, {callStatus: 'Call ended'});
        case 'callstart':
            return Object.assign({}, state, {callStatus: `Call with ${action.payload}`});
        case 'connect':
            return Object.assign({}, state, {callStatus: 'Connecting'});
        case 'failed':
            return Object.assign({}, state, {callStatus: 'Failed'});
        case 'show':
            return Object.assign({}, state, {index: !state.index});
        default:
            return state;
    }
}



const store = createStore(Reducer);
export default store;
