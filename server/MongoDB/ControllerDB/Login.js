import user from '../Schema/userSchema.js';

const login = async(req, res) => {

    const data = req.body;
    var state = false;

    await user.findOne({username: data.username, password: data.password})
    .then((data) => {
        if(!data.phoneNumber)
        {
            res.send('needPhoneNumber');
            state = true;
            return;
        }
        if(indexOf(data.ipAddress) != -1)
        {
            res.send('need2FA');
            state = true;
            return;
        } 
    })
    if(!state)
        res.send('wrong');
}

export default login;