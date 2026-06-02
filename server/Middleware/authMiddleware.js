const jwt= require ('jsonwebtoken')
require('dotenv').config()

const checkToken=(req,res,next)=>{
    const authUser= req.headers.authorization
    if(!authUser){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        let token
        if(authUser.startsWith('Bearer')){
            token=authUser.split(' ')[1]
        }else{
            token=authUser
        }

        const decoded= jwt.verify(token,process.env.SECRET)
        req.user=decoded
        next()

    } catch (error) {
        return res.status(401).json({message:'Invalid token'})
    }
}

module.exports=checkToken