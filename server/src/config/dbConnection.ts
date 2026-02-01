import mongoose from "mongoose";
import config from "./config";

export default function dbConnection (){
  return mongoose.connect(config.MONGOOSE_URI,)
}