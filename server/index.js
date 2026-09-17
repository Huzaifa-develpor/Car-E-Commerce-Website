const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const webRoutes = require('./Routes/appRoutes')
const Router = require('./Routes/authRouter')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/web/api/products', webRoutes)
app.use('/web/api/auth', Router)

mongoose.connect(process.env.dbUrl)
    .then(() => {
        console.log("connected to database")
    })
    .catch((err) => {
        console.error("Database connection failed:", err)
    })

module.exports = app