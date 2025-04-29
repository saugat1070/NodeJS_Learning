const mongoose = require('mongoose')
// mongoose.connect(db_uri).then(()=>{
//     console.log("Connected Succesfully");
// })
// .catch(()=>{
//     console.log("DataBase is not connected");
// })

const connect_to_db = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("connected DataBase");
    })
}

module.exports = connect_to_db