


const authorizedRoles = (...allowedRoles) => {
   return (req,res,next) => {
    if(!allowedRoles.includes(req.user.role)){
        res.status(401).json({message:"Access Denied"})
    }
    next()
   }
  
}
module.exports = authorizedRoles