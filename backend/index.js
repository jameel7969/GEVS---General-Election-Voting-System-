require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

//importing routes
const userRoutes = require('./routes/user')
const constituentRoutes = require('./routes/constituent')
const electionRoutes = require('./routes/election')
const resultRoutes = require('./routes/results')

const app = express()

app.use(cors())

app.use(bodyParser.json())

//middilware
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body)
    next()
})

//using routes
app.use('/gevs/user', userRoutes)
app.use('/gevs/', constituentRoutes)
app.use('/gevs/election', electionRoutes)
app.use('/gevs/results', resultRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port', process.env.PORT)
        })
    })