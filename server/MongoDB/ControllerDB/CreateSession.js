import session from '../Schema/sessionSchema.js';


const CreateSession = (ip) => {
    session.findOne({ip: ip})
    .then(sessionData => {
        if(!sessionData)
        {
            const newSession = new session({ip: ip});
            newSession.save();
        }
    })
}

export default CreateSession;