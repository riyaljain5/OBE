const User = require("../models/users");
const test = (req, res)=> {
    res.json("test is working")
}
const registerUser = async(req, res)=> {
    try{
        const{name, email, password}=  req.body;
        if (!name){
            return res.json({
                error:"name is required"
            })
        };
        if (!password || password.length<6){
            return res.json({
                error:"password is required and should be at least 6 characters long"
            })
        };
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error:"Email is taken already "
            })
        };

        const user = await User.create ({
            name, email, password
        })
        return res.json(user)
    }
    catch(error){
        console.log(error);

    }
}


const loginUser = async(req,res)=>{
    try {
        const {email, password}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error:"no user found"
            })
        };
        if (!password || password.length<6){
            return res.json({
                error:"password is required and should be at least 6 characters long"
            })
        };
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={test, registerUser, loginUser}
