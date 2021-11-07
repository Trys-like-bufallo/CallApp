import user from '../Schema/userSchema.js';

const CertPasscode = (req, res) => {
    
    const data = req.data;
    user.findOne({username: data.username, password: data.password, passcode: data.passcode})
    .then((cert) => {
        if(cert)
        {
            res.send('OK');
        }
        else
            res.send("WA");
    })
}

export default CertPasscode;