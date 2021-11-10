import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    passcode: {type: String ,default: '11112003'},
});

const user = mongoose.model('user', userSchema);

export default user;

