const authModel = require('../Models/authModel')
const getToken = require('../Services/authService')
const orderModel = require('../Models/orderModel')

const bcrypt = require('bcryptjs')

const registerUser= async (req, res)=>{
    const userData= req.body

    const saltrounds= 10
    const hashedPassword= await bcrypt.hash(userData.password, saltrounds)

    userData.password= hashedPassword
    const addUser=await authModel.create(userData)
    res.send({
        status: 200,
        message: "User registered Successfully",
        data: addUser
    })
}

const authUser= async (req,res)=>{
    const loginData=req.body
    const user= await authModel.findOne({email: loginData.email})
    if(!user){
        res.send("user Not found")
    }

    const isMatch= await bcrypt.compare(loginData.password,user.password)
    if(!isMatch){
        res.send('invalid Password')
    }

    const token =getToken(user)
    res.send({
        status:"true",
        message:"Login Successful",
        token,
        role:user.role
    })
    .catch((error)=>{
        res.send({
            status:"false",
            message:"Login Failed",
            error: error.message
        })
    })



}

const viewUsers = async (req, res)=>{
    await authModel.find()
    .then((users)=>{
        res.send({
            status: 200,
            message: "User List",
            data: users
        })
    }).catch((error)=>{
        res.send({
            status: 500,
            message: "Error while fetching users",
            error: error.message
        })
    })
}

const deleteUser = async (req, res) =>{
    const id = req.params.id
    await authModel.deleteOne({
        _id: id
    }).then(()=>{
        res.send({
            status: 200,
            message: "User deleted"
        })
    }).catch((error)=>{
        res.send({
            status: 500,
            message: "Error while deleting user",
            error: error.message
        })
    })
}

const updStatus = async (req, res) => {
    const id= req.params.id
    const newStatus= req.body.status
    const allowedStatus=["active", "blocked"]

    if(!allowedStatus.includes(newStatus)){
        res.send({
            status: "error",
            message: "Invalid status value"
        })
    }

    try {
        await authModel.updateOne(
            {_id: id},
            {status: newStatus}
        )
        res.send({
            status: "success",
            message: "User status updated successfully"
        })
    } catch (error) {
        res.send({
            status: "error",
            message: "Error while updating user status"
        })
    }
}

module.exports ={ registerUser, authUser, viewUsers, deleteUser, updStatus}