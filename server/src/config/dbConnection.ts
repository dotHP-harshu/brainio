import mongoose from "mongoose";
import config from "./config";

export default async function dbConnection (){
  return await mongoose.connect(config.MONGOOSE_URI,)
}