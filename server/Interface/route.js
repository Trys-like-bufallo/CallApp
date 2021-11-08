import Login from '../MongoDB/ControllerDB/Login.js';
import AddEmail from '../MongoDB/ControllerDB/AddEmail.js';
import GenPasscode from '../MongoDB/ControllerDB/GenPasscode.js';
import CertPasscode from '../MongoDB/ControllerDB/CertPasscode.js';
import CheckSession from '../MongoDB/ControllerDB/CheckSession.js'

const route = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    app.get('/login', Login);
    app.post('/addemail', AddEmail);
    app.get('/genpasscode', GenPasscode);
    app.get('/certpasscode', CertPasscode);
    app.get('/checksession', CheckSession);
}

export default route;