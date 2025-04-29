require('dotenv').config()
const express = require('express');
const connect_to_db = require('./DataBase/db_connect');
const Blog = require('./Model/blogModel');
const app = express();
app.use(express.json()) //eyo sabai project maa use garnu parcha


connect_to_db()

//Middleware
// app.use(()=>{
//     console.log("I am middleware")
// })
// app.get('/random', (req,res)=>{
//     res.send("this is random page")
// })

app.get('/',(req,res)=>{
    // res.json({
    //     message :"Thik cha sabai kura",
    // });
    res.status(200).json({
        message:"Thik cha sabai kura"
    })
})
app.get('/about',(req,res)=>{
    res.json({
        'message':'this is about Section'
    })
})

app.post('/blog',async (req,res)=>{
    // console.log(req.body);
    const {title,subtitle,description,image} = req.body;
    await Blog.create({
        title : title,
        subtitle:subtitle,
        description : description,
        image : image
    })
    res.status(201).json({
        message : "blog is created successfully"
    })
})

app.listen(process.env.PORT_NUMBER,()=>{
    console.log("NodeJs project has started");
});


