import mongoose from 'mongoose';
const {Schema} = mongoose;

const sessionSchema = new Schema({
    lastUse: {type: Date, default: new Date()},
});

const session = mongoose.model('session', sessionSchema);
export default session;