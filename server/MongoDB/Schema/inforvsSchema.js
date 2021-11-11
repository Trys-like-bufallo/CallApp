import mongoose from 'mongoose';
const {Schema} = mongoose;

const inforvsSchema = new Schema({
    ip: String,
    OS: String,
    Browser: String,
    VisitTime: String,
});

const inforvs = mongoose.model('inforvs', inforvsSchema);
export default inforvs;