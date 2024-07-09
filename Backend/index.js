const express = require("express");
const app = express();

// API created
app.get('/abc',(req,res)=>{
    res.send("working");
});

app.listen(8000, ()=>{
    console.log("Server is running at http://localhost:8000/abc");
});

