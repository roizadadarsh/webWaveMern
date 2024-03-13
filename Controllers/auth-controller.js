// In an express a contoller refers to a part of your code that is responsible for handling the application logic. contollers are typically used to process incoming request,interact with models data sources and send response back to clients . They help organize your application by seperating concers and following MVC(Model view controller) design patterns.
const User = require("../models/user-model")
const bcrypt = require("bcryptjs");
const home = async(req,res)=>{
  try {
    res.status(200).send("Please Login to our main page");
  } catch (error) {
    console.log("error");
  }
}

const register = async(req,res)=>{
  try {
    const {username,email,phone,password} = req.body;
     
    const UserExist = await User.findOne({email});

    if(UserExist){
      return res.status(400).json({message: "email already exist"});
    }

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password,saltRound);

    const userData = await User.create({username,email,phone,password});


    res.status(200).json({msg: "Registration Successfull" , token : await userData.generateToken(), userId:userData._id.toString()});
  } catch (error) {
    res.status(400).json("Internal Server Error");
  }
}

// login logic

const login = async(req,res) =>{
  try {
    const {email,password} = req.body;
    // checks in db whether this email exist or not
     const userExist = await User.findOne({email});

     if(!userExist){
      return res.status(400).json({message: "Invalid Credentials"});
     }

     // compare password
     const userPassword = await bcrypt.compare(password,userExist.password);
     if(userPassword){
      res.status(200).json({msg: "Login Successfull" , token : await userExist.generateToken(), userId:userExist._id.toString()});
     }
     else{
      res.status(401).json({message: "Invalid email or passowrd"});
     }
  } catch (error) {
    res.status(400).json("Internal server error");
  }
}

const user = async(req,res)=>{
     
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({userData});
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }

}

module.exports = {home,register,login,user};