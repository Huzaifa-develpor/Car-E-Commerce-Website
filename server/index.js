const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const webRoutes = require('./Routes/appRoutes')
const Router = require('./Routes/authRouter')

const app = express()

app.use(express.json())
app.use(cors())

// Cache the connection across serverless invocations
let isConnected = false

async function connectDB() {
    if (isConnected) return

    try {
        const db = await mongoose.connect(process.env.dbUrl, {
            serverSelectionTimeoutMS: 10000,
        })
        isConnected = db.connections[0].readyState === 1
        console.log("connected to database")
    } catch (err) {
        console.error("Database connection failed:", err)
        throw err
    }
}


app.use(async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (err) {
        res.status(500).json({ status: 500, message: "Database connection failed" })
    }
})

app.use('/web/api/products', webRoutes)
app.use('/web/api/auth', Router)

// Local development
if (require.main === module) {
    connectDB().then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log('server is running')
        })
    })
}

module.exports = app