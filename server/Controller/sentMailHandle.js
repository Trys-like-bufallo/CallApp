import nodemailer from 'nodemailer';

const sentMailHandle = (to, message) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anvakhuong@gmail.com',
            pass: 'an1234567890'
        }
    });

    const mailOptions = {
        from: 'anvakhuong@gmail.com',
        to: to,
        subject: 'Send passcode verify',
        text: message,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('sentMailHandle error: '+ error);
        } else {
            console.log('Email sent to ' + to);
        }
    });
}

export default sentMailHandle;