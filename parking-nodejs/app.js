const express = require('express')
const db = require('./config/db')
var cors = require('cors')
var app = express()
const path = require('path')

app.use(cors())
app.options('*', cors())
app.use(express.static(__dirname + '/public/'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send("welcome to our project")
})
const adminroutes = require('./routes/adminroutes')
const userroutes = require('./routes/userroutes')
require('./adminlogin/seed').seedadmin()
app.use('/admin', adminroutes);
app.use('/user', userroutes);
app.listen(7001, function () {
    console.log("server connected")
})
