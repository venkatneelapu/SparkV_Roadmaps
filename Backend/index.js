const express = require("express");
// const { createConnection } = require("net");
const app = express();
require("./Connection/conn");   // mongoose connection

// API created
app.get('/abc',(req,res)=>{
    res.send("working");
});

app.listen(8000, ()=>{
    console.log("Server is running at http://localhost:8000/abc");
});
