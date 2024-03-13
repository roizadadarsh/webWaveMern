// require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const serviceRouter = require("./router/services-router");
const adminRouter = require("./router/admin-router");
const ConnectDb = require("./utils/db");

const errorMiddleWare = require("./Middlewares/error-middleware");


// lets tackle cors policy
const corsOption ={
 origin: "http://127.0.0.1:5173",
 methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
 credentials: true,
};


app.use(cors(corsOption));
app.use(express.json());


app.use("/api/auth",authRouter);
app.use("/api/form",contactRouter);
app.use("/api/data",serviceRouter);

// lets define admin router

app.use("/api/admin",adminRouter);


// app.get("/", (req,res)=>{
//    res.status(200).send("Welcome to Hello World now");
// })
// app.get("/register", (req,res)=>{
//    res.status(200).send("Please Login");
// })

app.use(errorMiddleWare);  // use your middleware in server.js 

app.get("/",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"client","dist")));
  res.sendFile(path.resolve(__dirname,"client","dist","index.html"));
})

const port = 5000;
ConnectDb().then(()=>{
app.listen(port, ()=>{
  console.log(`Server running at port : ${port}`);
})
})
