const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ---------------- DATABASE ---------------- */

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

const ResultSchema = new mongoose.Schema({
ping:Number,
download:Number,
upload:Number,
date:{type:Date,default:Date.now}
});

const Result = mongoose.model("Result",ResultSchema);


/* ---------------- PING TEST ---------------- */

app.get("/ping",(req,res)=>{
res.send("pong");
});


/* ---------------- DOWNLOAD TEST ---------------- */

app.get("/download",(req,res)=>{

const size = 100 * 1024 * 1024;
const buffer = Buffer.alloc(size,"a");

res.set({
"Content-Type":"application/octet-stream",
"Content-Length":size
});

res.send(buffer);

});


/* ---------------- UPLOAD TEST ---------------- */

app.post("/upload",(req,res)=>{

let total = 0;

req.on("data",(chunk)=>{
total += chunk.length;
});

req.on("end",()=>{
res.json({received:total});
});

});


/* ---------------- SAVE RESULT ---------------- */

app.post("/save",async(req,res)=>{

const result = new Result(req.body);

await result.save();

res.json({message:"Saved"});

});


/* ---------------- GET HISTORY ---------------- */

app.get("/results",async(req,res)=>{

const data = await Result.find()
.sort({date:-1})
.limit(20);

res.json(data);

});


/* ---------------- START SERVER ---------------- */

app.listen(PORT,()=>{
console.log("Server running on port "+PORT);
});