import user from '../Schema/userSchema.js';

const login = async(req, res) => {

    const data = req.query;
    var state = false;
    await user.findOne({username: data.username, password: data.password})
    .then((data) => {
        if(!data)
            return;
        if(!data.phoneNumber)
        {
            res.send({status: 'needPhoneNumber'});
            state = true;
            return;
        }
        if(data.ipAddress.indexOf(data.ip) == -1)
        {
            res.send({status: 'need2FA', phoneNumber: data.phoneNumber});
            state = true;
            return;
        } 
        state = true;
        res.send({status: 'Login sucessfully'});
    })
    if(!state)
        res.send({status: 'wrong'});
}

export default login;