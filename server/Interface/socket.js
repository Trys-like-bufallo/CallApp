import http from 'http';
import {Server} from 'socket.io';
import session from '../MongoDB/Schema/sessionSchema.js'



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

        socket.on('disconnect', async() => {
            if(sessionData)
            {
                try {
                    await session.findById(sessionData)
                    .then((data) => {
                        if(data)
                        {
                            data.lastUse = new Date();
                            data.save();
                        }
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        });
    })
}

export default socket;