import Login from '../MongoDB/ControllerDB/Login.js';
import AddPhoneNumber from '../MongoDB/ControllerDB/AddPhoneNumber.js';
import GenPasscode from '../MongoDB/ControllerDB/GenPasscode.js';
import CertPasscode from '../MongoDB/ControllerDB/CertPasscode.js';

const route = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    app.get('/login', Login);
    app.post('/addphonenumber', AddPhoneNumber);
    app.get('/genpasscode', GenPasscode);
    app.get('/cerpasscode', CertPasscode);
}

export default route;