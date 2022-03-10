let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
  absolutePath = __dirname +"/views/index.html"
  res.sendFile(absolutePath)
  // res.send("Hello Express")
})
// app.get("/",(req,res)=>{
//   absolutePath = __dirname +"/public/style.css"
//   res.sendFile(absolutePath)
//   // res.send("Hello Express")
// })




app.get("/name",(req,res)=>{
  let firstName=req.query.first;
  let lastName=req.query.last;
  res.json({name:`${firstName} ${lastName}`})
})
app.post("/name",(req,res)=>{
 let firstName=req.body.first;
  let lastName=req.body.last;
  res.json({name:`${firstName} ${lastName}`})
})
app.get("/:word/echo",(req,res)=>{
  let {word}=req.params;
  res.json({echo:word})
})

app.get("/now",(req,res,next)=>{
  req.time=new Date().toString()
  next();
},(req,res)=>{
  res.json({time:req.time})
})

app.use((req,res,next)=>{
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
  next();
})




let response="Hello json".toLocaleUpperCase();
 

app.get("/json",(req,res)=>{
  if (process.env.MESSAGE_STYLE === "uppercase") {
     response = "Hello json".toUpperCase();
  } else {
  response = "Hello json";
}
 
  res.json({"message":response})
})







































 module.exports = app;
