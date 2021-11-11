import session from '../MongoDB/Schema/sessionSchema.js';

const checksessionHandle = async(req, res) => {

    const sessionData = req.query.session;
        await session.findById(sessionData)
        .then(data => {
            if(!data){
                res.send('session error');
            }
            else {
                const now = new Date();
                // console.log(now - data.lastUse);
                // console.log(data.lastUse);
                if(now - data.lastUse > 5 * 60 * 1000)
                {
                    res.send('session error');
                    session.findByIdAndDelete(sessionData, (err, docs) => {
                        if(err) console.log(err);
                        else console.log('delete session : ' + docs._id);
                    });
                    return;
                }
                res.send({status: 'session success', session: sessionData});
                data.lastUse = new Date();
                data.save();
            }
            return;
        })
        .catch(err => {
            res.send('session error')
            console.log('check session error');
        });
} 

export default checksessionHandle;