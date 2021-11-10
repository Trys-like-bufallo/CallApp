import session from '../MongoDB/Schema/sessionSchema.js';

const checksessionHandle = async(req, res) => {

    const sessionData = req.query.session;
    
    try {
        await session.findById(sessionData)
        .then(data => {
            if(!data){
                res.send('session error');
            }
            else {
                const now = new Date();
                if(now - data.lastUse > 5 * 60 * 1000)
                {
                    res.send('session errror');
                    session.findByIdAndDelete(sessionData);
                    return;
                }
                res.send({status: 'session success', session: sessionData});
                data.lastUse = new Date();
                data.save();
            }
        })
        
    } catch (error) {
        console.log('checksession error: ' + error);
    }
}

export default checksessionHandle;