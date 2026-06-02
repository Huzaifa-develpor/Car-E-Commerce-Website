const jwt= require('jsonwebtoken')
require('dotenv').config()

const getToken=(user)=>{
    const token=jwt.sign(
        {id:user._id,
         role: user.role },
        process.env.SECRET,
        {expiresIn :'3h'}
    )
    return token 
}

module.exports= getToken