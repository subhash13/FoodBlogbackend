const express = require('express');
const app = express();
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 4000;

//upload files
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'})

//database connection
const dbURL = "mongodb://localhost:27017/foodBlog"
mongoose.connect(dbURL).then(()=>{
    console.log("connected to database");
})

app.post('/post',uploadMiddleware.single('file'), (req, res)=>{
    res.json({file:req.file})
})

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
});