import inforvs from '../MongoDB/Schema/inforvsSchema.js';

const getdataHandle = (req, res) => {
    inforvs.find({})
    .then(data => res.send(data));
}

export default getdataHandle;