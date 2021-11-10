import user from '../MongoDB/Schema/userSchema.js';


const signupHandle = async (req, res) => {

    const userData = req.body;
    user.findOne({username: userData.username})
    .then((data) => {
        if(data){
            res.send('username-exited');
        }
        else{
            res.send('signup-success');
            const newUser = new user(userData);
            newUser.save();
        }
    })
    .catch(err => console.log('signupHandle error: ' + err));
}

export default signupHandle;