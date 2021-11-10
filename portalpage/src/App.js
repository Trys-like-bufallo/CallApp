import io from 'socket.io-client';
import host from './Host.js';
import {useState, useEffect} from 'react';



const socket = io(host);



const App = () => {

    const [infor, setInfor] = useState([]);

    useEffect(() => {
        socket.on('new connection', data => {
            console.log(data);
        })
    }, []);

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

export default App;