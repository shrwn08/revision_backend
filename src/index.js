import 'dotenv/config'
import {app} from "./app.js"
import connectDB from "./db/index.js";


// import dotenv from "dotenv"



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
        
    })
})
.catch((err)=>console.error("MOngoDB Connection failed", err))







/*
import express from "express"

const app = express();

(async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.error("ERROR", error);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
     console.error("ERROR", error) 
     throw error  
    }
})()*/