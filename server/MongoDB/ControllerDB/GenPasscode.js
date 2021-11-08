import user from '../Schema/userSchema.js';
import nodemailer from 'nodemailer';


const GenPasscode = (req, res) => {
    
    const data = req.query;
    const passcode = Math.floor(Math.random() * 100000);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anvakhuong@gmail.com',
            pass: 'an1234567890'
        }
    })
    const mailOptions = {
        from: 'anvakhuong@gmail.com',
        to: data.email,
        subject: 'sendding Passcode',
        text: passcode.toString()
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
        }
    });

    user.findOne({username: data.username, password: data.password})
    .then(User => {
        User.passcode = passcode;
        User.save();
        res.send('need2FA');
    });
}

export default GenPasscode;
