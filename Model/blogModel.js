const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({    //object of Schema
    title : {
        type : String,
        unique : true,
    },
    subtitle : {
        type : String,
    },
    description : {
        type : Text,
    },
    image : {
        type : String,
    
    },


})

const Blog =  mongoose.model('Blog',blogSchema) //build model
module.exports = Blog
