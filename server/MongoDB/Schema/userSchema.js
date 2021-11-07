import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {String, required : true},
    password: {String, required : true},
    phoneNumber: {String},
    iPaddress: {String},
});

const user = mongoose.model('user', userSchema);

export default user;

