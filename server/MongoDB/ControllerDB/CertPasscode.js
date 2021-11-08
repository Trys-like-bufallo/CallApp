import user from '../Schema/userSchema.js';
import session from '../Schema/sessionSchema.js';

const CertPasscode = (req, res) => {
    
    const data = req.query;
    user.findOne({username: data.username, password: data.password, passcode: data.passcode})
    .then((cert) => {
        if(cert)
        {
            const newSession = new session();
            newSession.save();
            res.send({status: 'Login sucessfully', session: newSession._id});
            cert.ipAddress.push(data.ip);
            cert.save();
        }
        else
            res.send({status: "Wrong2FA"});
    })
}

export default CertPasscode;