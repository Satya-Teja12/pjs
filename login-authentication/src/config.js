const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/login");


connect.then(()=>{
    console.log("Database connected sucessfully");
})
.catch(()=>{
    console.log("Database could not be connected");
});

// Schema creation 
const LoginSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true, 
  },

  password:{
    type:String,
    required:true, 
  }
});

const collection = new mongoose.model('auths',LoginSchema);

module.exports = collection;