const uri = 'mongodb+srv://hoaian412003:fgdffpanmg@socialnetwork.rx8fz.mongodb.net/SocialNetwork?retryWrites=true&w=majority'
import mongoose from 'mongoose';

const connectMongoDB = () => {
    mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log('Connect Sucessfully'))
    .catch(err => console.log(err));
}

export default connectMongoDB;