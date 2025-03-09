const jwt = require("jsonwebtoken")


const verifyToken = (req,res,next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
         token = authHeader.split(" ")[1]
         if(!token){
            res.status(400).json({messsage:"Token is missing"})
         }

         const decode = jwt.verify(token,process.env.SECRET_KEY)
         req.user = decode
         console.log("Decoded user " , decode)
         next()
    }
}
module.exports = verifyToken