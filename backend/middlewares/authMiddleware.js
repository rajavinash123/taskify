// const { decode } = require("jsonwebtoken");

const jwt=require("jsonwebtoken");


const authMiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
         return res.status(401).json({ message: "No token, access denied" });
    }
 try{
    const decode=jwt.verify(token,"SECRET_KEY");
    req.user=decode;
    next();

 }catch(err){
     res.status(401).json({ message: "Invalid token" });
 }

}

module.exports=authMiddleware;