// it acts as a middleware where it takes a schema as an argument where this schema is defined previousely in signup schema section and its basically a object schema and with the help of parseAsync() method it checks whether it is correct or not.


const validate = (schema)=> async (req,res,next)=>{
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = error.issues[0].message;
      
    const err = {
      status,
      message,
      extraDetails,
    };

     next(err);
    // console.log(message);
    // res.status(400).json({msg: message});
  }
}

module.exports = validate;