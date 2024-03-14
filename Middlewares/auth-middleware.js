const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
require("dotenv").config()

const authMiddleware = async (req,res,next)=>{
    const token  = req.header("Authorization");

    if(!token){
      return res.status(401).json({message: "Unauthorized HTTP Token not provided"});
    }
    const jwtToken = token.replace("Bearer","").trim();
    console.log("token from middleware",jwtToken);

    try {
       const isVerify = jwt.verify(jwtToken,process.env.SECRET_KEY);
       const userData = await User.findOne({email: isVerify.email}).select({
        password : 0,
       });
       console.log(userData);
       // own custom values
       req.user = userData;
       req.token = token;
       req.userID= userData._id;

      next();
    } catch (error) {
      return res.status(401).json({message: "Unauthorized Invalid token"});
    }

    
}

module.exports = authMiddleware;