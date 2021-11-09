import user from '../Schema/userSchema.js';
import session from '../Schema/sessionSchema.js';
import CreateSession from './CreateSession.js';

const login = async(req, res) => {

    const data = req.query;
    var state = false;
    await user.findOne({username: data.username, password: data.password})
    .then((userdata) => {
        if(!userdata)
            return;
        if(!userdata.email)
        {
            res.send({status: 'needEmail'});
            state = true;
            return;
        }
        if(userdata.ipAddress.indexOf(data.ip) == -1)
        {
            res.send({status: 'need2FA', email: userdata.email});
            state = true;
            return;
        } 
        state = true;
        CreateSession(data.ip);
        res.send({status: 'Login sucessfully'});

    })
    if(!state)
        res.send({status: 'WrongAccount'});
}

export default login;