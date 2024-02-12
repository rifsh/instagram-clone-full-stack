import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(__dirname, '../config.env')});

export function connection() {
    mongoose.connect(process.env.DATABASE_URL,{
        dbName:'instagram'
    }).then((res)=>{
        // console.log("Connected");
    },(err)=>{
        console.log(err.message);
    })
}


// mongoose.connect()