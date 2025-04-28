const db_uri = 'mongodb+srv://saugatgiri1070:saugat10@cluster0.89mrv7g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoose = require('mongoose')
// mongoose.connect(db_uri).then(()=>{
//     console.log("Connected Succesfully");
// })
// .catch(()=>{
//     console.log("DataBase is not connected");
// })

const connect_to_db = async ()=>{
    await mongoose.connect(db_uri).then(()=>{
        console.log("connected DataBase");
    })
}

module.exports = connect_to_db