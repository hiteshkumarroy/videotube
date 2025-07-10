 import mongoose from "mongoose";
 import { DB_NAME } from "../constants.js";

const connect_DB=async()=>{
  try{

    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("mongodb connected");
  }catch(error){
console.log("couldn't connect mongodb",error);
  }
}
export default connect_DB;
