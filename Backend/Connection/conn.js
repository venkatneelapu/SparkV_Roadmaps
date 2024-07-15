const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://user:link").then(()=>{
mongoose.connect("mongodb+srv://aman:aman123@backend.e5eheie.mongodb.net/").then(()=>{
    console.log("my db is connected");
}).catch((error)=>{
    console.log("error in db connection",error);
});