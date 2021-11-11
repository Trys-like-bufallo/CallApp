import user from '../MongoDB/Schema/userSchema.js';
import session from '../MongoDB/Schema/sessionSchema.js';

const verifyHandle = async(req, res) => {
    const userData = req.query;

    user.findOne({username: userData.username, password: userData.password})
    .then(data => {
        if(!data)
            res.send('verify-error');
        else{
            if(data.passcode === userData.passcode)
            {
                const newSession = new session({lastUse: new Date()});
                newSession.save();
                res.send({status: 'verify-success', session: newSession._id});
            }
            else res.send('verify-error');
        }
    })
    .catch(err => console.log('verify error: ' + err));
}
export default verifyHandle;