const express= require("express");
app=express();
const mongoose=require("mongoose");
const methodoverride=require("method-override");
app.use(methodoverride("_method"));

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const ejsMate= require("ejs-mate");
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

const {connectMongodb} =require("./connection.js");
connectMongodb("mongodb://127.0.0.1:27017/airbnb").then(()=>{
    console.log("connection successful");
});

const Listing=require("./models/listing.js");


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

//index Route

app.get("/listing",async (req,res)=>{
    let alllisting= await Listing.find({});
    res.render("./listings/index.ejs",{alllisting});
});

//new Route

app.get("/listing/new", (req,res)=>{
    res.render("./listings/new.ejs")
});

//edit Route
app.get("/listing/:id/edit", async (req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
});

//update Route
app.put("/listing/:id", async (req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listing");
})

app.delete("/listing/:id", async (req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})


//show Route
app.get("/listing/:id", async (req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
})

//new Route
// app.use((req, res, next)=>{
//     console.log(`${req.method} ${req.url}`);
//     next();
// });



// Create Route
app.post("/listing",(req,res)=>{
    // let {title,description,image,price,location,country}=req.body;
    let listing= req.body.listing;
    new Listing(listing).save().then(()=>{
        console.log("data saved")
    });
    res.redirect("/listing")

});





// app.get("/testlisting", async (req, res) => {
//     try {
//         let data = new Listing({
//             title: "My new villa",
//             description: "By the beach",
//             price: 120000,
//             location: "Goa",
//             country: "India"
//         });

//         await data.save();

//         console.log("data saved");
//         res.send("yes");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error saving data");
//     }
// });


