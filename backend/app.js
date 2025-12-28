const express = require('express')
const mongoose =require('mongoose')
const morgan = require('morgan')
const lodash = require('lodash')
const articles = require('./apiRoutes/routes')
const users = require('./apiRoutes/userApi')
const app =express()

require('dotenv').config()
const cors = require("cors");
const cookieParser = require('cookie-parser')
Port = process.env.PORT || 5000
pass = process.env.DB_PASS


const UDIR =pass
mongoose.connect(UDIR,)
.then(app.listen(Port),console.log('server connected'))
.catch((err)=>console.log(err.message))

app.set('trust proxy', 1);
app.use(cors({
    origin: "https://inkspirewrite.vercel.app",
    // origin:"http://localhost:5173"  ,
    methods:['GET',"POST","DELETE","PUT"],
    credentials: true
}));
app.use(cookieParser())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/articles',articles)
app.use('/users', users)
