require('dotenv').config()
const express = require('express');
const connect_to_db = require('./DataBase/db_connect');
const Blog = require('./Model/blogModel');
const app = express();
app.use(express.json()) //eyo sabai project maa use garnu parcha
const fs = require('fs'); //to handle file delete or operation
//This multer middleware is used to handle file upload from fronted
const {multer,storage} = require('./middleware/mutlerConfig')
const upload = multer({storage : storage});

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

app.post('/blog',upload.single('image'),async (req,res)=>{
    // console.log(req.body);
    const {title,subtitle,description,image} = req.body;
    if(!title || !subtitle || !description || !image ){
        return res.status(400).json({
            message : "Check value of title,subtitle,describe or image"
        })
    }
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


app.post('/image_upload',upload.single('image'),async (req,res)=>{
    let filename = null
    const {title,subtitle,description} = req.body
    console.log(req.file)
    // if(req.file){
    //     filename = 
    // }
    if(!title || !subtitle || !description){
        return res.status(400).json({
            message : "please provide title,subtitle,description"
        })
    }
    if(req.file){
        filename = req.file.filename
    }

    await Blog.create({
        title : title,
        subtitle : subtitle,
        description : description,
        image : filename
    })
    res.status(200).json({
        message:"send response",
    })
})

app.get("/blog",async (req,res)=>{
    const blogs = await Blog.find()
    res.status(200).json({
         message:"blog fetch successfully",
         data : blogs
    })
})

app.get("/blog/:id", async (req,res)=>{
    // console.log(req.params.id);
    const id = req.params.id
    const blog_id = await Blog.findById(id);
    if(!blog_id){
        return res.status(400).json({
            message : "id is not sent"
        });
    }
    return res.status(200).json({
        message : "blog by id is fetch successfully",
        data : blog_id
    });
   
})

app.delete('/blog/:id',async (req,res)=>{
    const param_id = req.params.id
    const blog = await Blog.findById(param_id);
    console.log(blog);
    const fileName = blog.image;
    console.log(fileName)
    fs.unlink(`storage/${fileName}`,(error,success)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("file deleted");
        }
    })
    await Blog.findByIdAndDelete(param_id);
    res.status(200).json({
        message : "blog is deleted"
    });
})

app.patch('/blog/:id',upload.single('image'), async (req,res)=>{
    const id = req.params.id
    let new_fileName = null;
    if(req.file){
        new_fileName = req.file.filename
        const blog = await Blog.findById(id)
        const fileName = blog.image

        fs.unlink(`storage/${fileName}`,(err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('file deleted');
            }
        })



    }
    const {title,subtitle,description} = req.body
    const updated_blog = await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle : subtitle,
        description : description,
        image : new_fileName
    })
    
    res.status(202).json({
        message : "data is accepted",
        data : updated_blog
    })
})

app.listen(process.env.PORT_NUMBER,()=>{
    console.log("NodeJs project has started");
});
