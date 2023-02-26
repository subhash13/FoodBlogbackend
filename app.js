const express = require('express');
const app = express();
const cors = require('cors');// cross origin resource sharing
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

//setting port
const PORT = process.env.PORT || 4000;

//importing mongoose model
const Post = require('./models/posts.js')

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors()); //specifying to use cors

//database connection
const dbURL = "mongodb://localhost:27017/foodBlog"
mongoose.connect(dbURL).then(() => {
    console.log("connected to database");
})

app.get('/posts',async(req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts)
    }catch(err){
        console.log(err)
    }
})

app.get('/posts/:id',async(req,res)=>{
    const Post = await Post.findOne({id:req.params.id})
    res.send(Post)
})

app.post('/add-post', async (req, res) => {
    let postData = new Post({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        image: req.body.image,
        location: req.body.location,
    })
    try{
        await postData.save()
        res.send({ message: "Post added successfully" })
    }catch(e){
        res.send({ message: "Error saving post" })
    }
})


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});