import user from '../Schema/userSchema.js';
import session from '../Schema/sessionSchema.js';
import CreateSession from './CreateSession.js';

const CertPasscode = (req, res) => {
    
    const data = req.query;
    user.findOne({username: data.username, password: data.password, passcode: data.passcode})
    .then((cert) => {
        if(cert)
        {
            res.send({status: 'Login sucessfully'});
            cert.ipAddress.push(data.ip);
            cert.save();
            CreateSession(data.ip);
        }
        else
            res.send({status: "Wrong2FA"});
    })
}

export default CertPasscode;