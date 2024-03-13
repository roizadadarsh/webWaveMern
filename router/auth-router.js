const express= require("express");
const router = express.Router();
const {home, register,login,user} = require("../Controllers/auth-controller");
const {signup,loginSchema} = require("../Validators/auth-validation");
const validate = require("../Middlewares/Middleware-validators");
const authMiddleware = require("../Middlewares/auth-middleware")

router.route("/").get(home);

router.route("/register").post(validate(signup),register);
router.route("/login").post(validate(loginSchema),login);
router.route("/user").get(authMiddleware,user);

// router.route("/").get((req,res)=>{
//   res.status(200).send("Please Login to our main page");
// })

module.exports = router;