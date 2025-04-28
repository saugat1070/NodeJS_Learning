const express = require('express');
const connect_to_db = require('./DataBase/db_connect');
const app = express();

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

app.listen(3000,()=>{
    console.log("NodeJs project has started");
});


