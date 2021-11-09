import session from '../Schema/sessionSchema.js';

const CheckSession = async(req, res) => {
    const ip = req.query.ip;
    
    try {
        await session.findOne({ip: ip})
        .then(user => {
            if(!user){
                res.send({status: 'WrongAccount'});
                return;
            }
            const now = new Date();
            if(now - user.lastUse > 5 * 60 * 1000)
            {
                res.send({status: 'WrongAccount'});
                return;
            }
            
            res.send({status: 'Login sucessfully'});
        })
        .catch(err => console.log(err))
    } catch (error) {
        res.send({status: 'WrongAccount'});
    }

}

export default CheckSession;