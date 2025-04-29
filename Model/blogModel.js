const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  //object of Schema
  title: {
    type: String,
    unique: true,
    null:false,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
    null:false,
  },
  image: {
    type: String,
    null: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema); //build model
module.exports = Blog;
