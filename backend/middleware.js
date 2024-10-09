const {JWT_SECRET} = require("./config")

const jwt=require("jsonwebtoken");



const authMiddleware=(req,res,next)=>{

    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(403).json({
                message:"Invalid authorization Header"
            })
    }

    const token=authHeader.split(' ')[1];

    try{
            const decoded=jwt.verify(token,JWT_SECRET)/* Will extract payload and along with secret, the signature will be regenerated
            after that signature matching will happen, if everything went right then decoded data will be assigned 
            */
            if(decoded.userId){
                req.userId=decoded.userId;
                next();
            }
            else{
                return res.status(403).json({})
            }
    }
    catch(err){
        return res.status(403).json({})
    }
}

module.exports = {
    authMiddleware
}