const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const getAllUsers = async(req,res)=>{
   try {
     const users = await User.find({},{password:0});

     if(!users || users.length===0){
       res.status(404).json({message: "No users found"});
     }

     res.status(200).json(users);
   } catch (error) {
    next(error);
   }
}

const getAllContacts = async(req,res,next)=>{
   try {
    
    const contacts = await Contact.find();

      if(!contacts || contacts.length===0){
       return  res.status(404).json({message: "No contacts found"});
      }
      return res.status(200).json(contacts);
   } catch (error) {
       next(error);
   }
}

// get a single user data

const getSingleUserData = async(req,res,next)=>{
  try {
    const id = req.params.id;
    const data = await User.findOne({_id : id},{password: 0})
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
  

}

// update user id

const UpdateUserId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Corrected method name: updateOne
    const updateUser = await User.updateOne({ _id: id }, { $set: data });

    return res.status(200).json(updateUser);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};


// delete user id

const deleteUserId = async(req,res,next)=>{
  try {
    const id = req.params.id;
    await User.deleteOne({_id : id});
    return res.status(200).json({message: "User deleted Successfully"});
  } catch (error) {
    next(error);
  }
  
}
const deleteContactById = async(req,res,next)=>{
  try {
    const id = req.params.id;
    await Contact.deleteOne({_id : id});
    return res.status(200).json({message: "User deleted Successfully"});
  } catch (error) {
    next(error);
  }
  
}

module.exports = {getAllUsers,getAllContacts,deleteUserId,getSingleUserData,UpdateUserId,deleteContactById};