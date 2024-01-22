const mongoose = require("mongoose");
let defaultimg="https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const listingSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:defaultimg,
        set:(v)=>{
           return v===""? defaultimg:v 
        }
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});

const Listing= mongoose.model("Listing",listingSchema);
module.exports= Listing;