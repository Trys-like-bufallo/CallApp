import session from '../Schema/sessionSchema.js';

const CheckSession = async(req, res) => {
    const sessionData = req.query.session;

    try {
        await session.findById(sessionData)
        .then((data) => {
            if(!data)
            {
                res.send({status: 'WrongAccount'});
                return;
            }
            const now = new Date();
            if(now - data.lastUse > 5*60*1000)
            {
                res.send({status: 'WrongAccount'});
                session.findByIdAndDelete(sessionData)
                .then((err, docs) => {
                    if(err)
                        console.log(err);
                })
                return;
            }        
            res.send({status: 'Login sucessfully', session: sessionData});
            data.lastUse = new Date();
            data.save();

        });
    } catch (error) {
        res.send({status: 'WrongAccount'});
    }

}

export default CheckSession;