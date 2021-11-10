import loginHandle from "../Controller/loginHandle.js";
import signupHandle from "../Controller/signupHandle.js";
import createPasscodeHandle from "../Controller/createPasscodeHandle.js";
import verifyHandle from "../Controller/verifyHandle.js";
import checksessionHandle from '../Controller/checksessionHandle.js';


const route = (app) => {

    app.get('/', (req, res) => {
        res.send('Hello World');
    })

    //[GET] /login
    app.get('/login', loginHandle);

    // [POST] /signup
    app.post('/signup', signupHandle);

    // [GET] /createpasscode
    app.get('/createpasscode', createPasscodeHandle);

    // [GET] /verify
    app.get('/verify', verifyHandle);

    // [GET] /checksession
    app.get('/checksession', checksessionHandle);
}

export default route;