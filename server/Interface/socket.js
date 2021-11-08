import http from 'http';
import {Server} from 'socket.io';



const socket = (app, PORT) => {
    const server = http.createServer(app);
    const io = new Server(server);
    server.listen(PORT);
    io.on('connection', (socket) => {
        console.log(socket.id);
        io.on('disconnect', () => {
            console.log(socket.id + 'disconnected');
        });
    })
}

export default socket;