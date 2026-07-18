const carModel = require("../Models/productsModel")
const insertProduct = async (req, res) => {
    const carsData = req.body
    try {
        const insertedCars = await carModel.create(carsData)
        res.send({
            status: 200,
            message: "Data inserted",
            data: insertedCars
        });
    } catch (error) {
        console.log("error while adding Car ", error);
        res.send({
            status: 500,
            message: "Error occured",
            error: error.message
        });
    }
};
const viewProduct = async (req, res) => {
    const productList = await carModel.find({status:"active"})
    res.send({
        status: 200,
        message: "car list",
        cars: productList
    })
}

// For Admin use

const deleteProduct = async (req, res) => {
    const id = req.params.id
        await carModel.deleteOne({
            _id: id
        }).then(()=>{
            res.send({
                status: 200,
                message: "product deleted"
            })
        }).catch((error)=>{
            res.send({
                status: 500,
                message: "error while deleting product",
                error: error.message
            })
        })
    
}

const updateProductStatus = async (req, res) => {
    try{
    const id = req.params.id
    const car = await carModel.findById(id)
    let newStatus =car.status ==="active" ? "deactivate" : "active"
    await carModel.updateOne(
        {_id:id},
        {status: newStatus})
    res.send({
        status: 200,
        message: "product status updated",
        newStatus
    })
    }
    catch(error){
        res.send({
            status: 500,
            message: "error while updating product status",
            error: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id
    const updateData = req.body
    await carModel.updateOne({
        _id: id
    },updateData).then(()=>{
        res.send({
            status: 200,
            message: "product updated"
        })
    }).catch((error)=>{
        res.send({
            status: 500,
            message: "error while updating product",
            error: error.message
        })
    })
}



const categoryProduct = async (req, res) => {
    const name = req.params.category
    const categoryList = await carModel.find({
        brandName: { $regex: name, $options: "i" }
    })
    res.send({
        status: 200,
        categoryItems: categoryList
    })
}

const searchProduct = async (req, res) => {
    const Name = req.params.name
    const searchList = await carModel.find({
        $or:
            [{ brandName: { $regex: Name, $options: "i" } },
            { carName: { $regex: Name, $options: "i" } }]
    });
    res.send({
        status: 200,
        message: "search result",
        cars: searchList
    })
}

const getProductModel = async (req,res)=>{
    const model= req.params.model
    const modelList = await carModel.find({
        carName: {$regex:model, $options: "i"}
    })
    res.send({
        status: 200,
        message: "model list",
        carList: modelList
    })
}

const productDetail= async (req,res)=>{
    const id = req.params.id
    const item = await carModel.findById(id)
    res.send({
        status: 200,
        message: "product details",
        product: item
    })
}
module.exports = { insertProduct, viewProduct, categoryProduct, searchProduct, getProductModel, productDetail, deleteProduct, updateProduct, updateProductStatus }