import user from '../Schema/userSchema.js';


const GenPasscode = (req, res) => {
    
    const data = req.body;
    const passcode = Math.floor(Math.random() * 100000);
    console.log(passcode);
    res.send('123456');
    // res.send(passcode);
    // user.findOne({username: data.username, password: data.password})
    // .then(User => {
    //     User.passcode = passcode;
    // });
}

export default GenPasscode;
