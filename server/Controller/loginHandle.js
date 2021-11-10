import user from '../MongoDB/Schema/userSchema.js';

const loginHandle = async(req, res) => {
    const userData = req.query;
   
    user.findOne({username: userData.username, password: userData.password})
    .then((user) => {
        if(user)
            res.send('login-success');
        else
            res.send('login-error');
    })
    .catch(err => console.log('loginHandle error: ' + err));
}

export default loginHandle;