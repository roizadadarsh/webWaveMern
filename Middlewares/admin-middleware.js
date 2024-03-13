const adminMiddleware = async(req,res,next)=>{
   try {
     const adminRole = req.user.isAdmin;
     if(!adminRole){
      return res.status(403).json({message: "Access denied. User is not an admin"});
     }
     // if user is an admin then and only then next middleware is executed otherwise not;
     next();
   
   } catch (error) {
    next(error);
   }
}

module.exports = adminMiddleware;