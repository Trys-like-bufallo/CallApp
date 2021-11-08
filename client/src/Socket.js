import io from 'socket.io-client';
import host from './Host.js';

const socket = io(host);

export default socket;
