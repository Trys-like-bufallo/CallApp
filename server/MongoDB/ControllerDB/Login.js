import user from '../Schema/userSchema.js';



const login = async(data) => {

    var state = false;

    await user.findOne({username: data.username, password: data.password})
    .then((data) => {
        if(!data.phoneNumber)
        {
            res.send('Please Enter Your Phone Number to vertication');
            return;
        }
        if(indexOf(data.ipAddress) != -1)
        {
            
        }
        
    })


}