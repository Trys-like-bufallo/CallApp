import JsSIP from 'jssip';
var socket = new JsSIP.WebSocketInterface('wss://sbc03.tel4vn.com:7444');
var configuration = {
    sockets  : [ socket ],
    uri      : 'sip:106@2-test1.gcalls.vn:50061',
    password : 'test1106',
    no_answer_timeout: 3000,
    register_expires: 300,
    session_timers: false,
};

var ua = new JsSIP.UA(configuration);

ua.start();

export default ua;