import user from '../Schema/userSchema.js';

const AddPhoneNumber = (req, res) => {
    const data = req.body;
    console.log(data);
    user.findOne({username: data.username, password: data.password})
    .then((User) => {
        User.phoneNumber = data.phoneNumber;
        User.save();
    })
    .catch(err => console.log(err));
    res.send('Phone number successfully added');
}

export default AddPhoneNumber;