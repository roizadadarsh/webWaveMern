const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URI);

const URI = "mongodb+srv://Adarsh:C6wLx4DMdpZnEzMJ@cluster0.fyalcuh.mongodb.net/?retryWrites=true&w=majority";
const ConnectDb = async()=>{
  try {
    await mongoose.connect(URI);
    console.log("Database Connection Successfull");
  } catch (error) {
    console.log("Database Connection Failed");
    process.exit(0);
  }
}

module.exports = ConnectDb;

// # MONGODB_URI= mongodb+srv://Adarsh:C6wLx4DMdpZnEzMJ@cluster0.fyalcuh.mongodb.net/?retryWrites=true&w=majority