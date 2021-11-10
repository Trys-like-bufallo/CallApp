import user from '../MongoDB/Schema/userSchema.js';
import sentMailHandle from './sentMailHandle.js';

const createPasscodeHandle = async(req, res) => {

    const userData = req.query;

    
    user.findOne({username: userData.username, password: userData.password})
    .then((data) => {
        if(data)
        {
            const passcode = Math.floor(Math.random() * 10000000);
            data.passcode = passcode.toString();
            data.save();
            sentMailHandle(data.email, data.passcode);
            res.send('sent-passcode-success');
        }
    })
}
export default createPasscodeHandle;