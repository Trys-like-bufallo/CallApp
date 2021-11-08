import user from '../Schema/userSchema.js';

const AddEmail = (req, res) => {
    const data = req.body;
    console.log(data);
    user.findOne({username: data.username, password: data.password})
    .then((User) => {
        User.email = data.email;
        User.save();
        res.send({status: 'need2FA', email: data.email});
    })
    .catch(err => console.log(err));
}

export default AddEmail;