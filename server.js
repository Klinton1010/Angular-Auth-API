const express=require('express');
const bodyparser=require('body-parser');
const api=require("./routes/api");
var cors = require('cors')
const PORT=3000;

//Initialize the express
const app=express();
app.use(cors())
app.use(bodyparser.json());
app.use("/api",api);

app.get('/',function(req,res){
    res.send("Hello world")
   
})

app.listen(PORT,function(){
    console.log("The app is listening port 3005")
})