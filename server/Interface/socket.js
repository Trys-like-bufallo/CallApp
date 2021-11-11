import http from 'http';
import {Server} from 'socket.io';
import session from '../MongoDB/Schema/sessionSchema.js'
import inforvs from '../MongoDB/Schema/inforvsSchema.js'



const socket = (app, PORT) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });
    server.listen(PORT);
    io.on('connection', (socket) => {
        
        var sessionData = '';
        socket.on('send session', (data) => {
            sessionData = data;
        });

        socket.on('new connection', async(data) => {
            io.sockets.emit('1', data);
            const newInforvs = new inforvs(data);
            newInforvs.save();
        })
        socket.on('disconnect', () => {
            if(sessionData)
            {
                session.findByIdAndUpdate(sessionData, {lastUse: new Date()}, {new: true})
                .then((data) => {
                    data.save();
                })
                .catch(err => console.log(err));
            }
        });
    })
}

export default socket;