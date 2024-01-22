const initdata= require("./data.js");

const {connectMongodb} =require("../connection.js");
connectMongodb("mongodb://127.0.0.1:27017/airbnb").then(()=>{
    console.log("connection successful");
});

const Listing= require("../models/listing.js");

Listing.insertMany(initdata.data).then(()=>{
    console.log("data saved");
}).catch((err)=>{
    console.log(err)
});