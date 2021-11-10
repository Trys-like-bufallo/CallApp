import {createStore} from 'redux';
var initialState = {
    callStatus: '',
    incall: false,
    login: false,
    load: false,
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
        case 'login':
            return Object.assign({}, state, {login: true});
        case 'load':
            return Object.assign({}, state, {load: true});
        default:
            return state;
    }
}



const store = createStore(Reducer);
export default store;
