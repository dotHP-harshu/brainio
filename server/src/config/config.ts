import dotenv from "dotenv"
dotenv.config()
interface ConfigInterface {
  PORT: number;
  GOOGLE_CLIENT_ID:string;
  GOOGLE_CLIENT_SECRET:string;
  MONGOOSE_URI:string;
  CLIENT_URL:string;
  SESSION_SECRET:string
}

const config : ConfigInterface = {
  GOOGLE_CLIENT_ID:String(process.env.GOOGLE_CLIENT_ID),
  GOOGLE_CLIENT_SECRET:String(process.env.GOOGLE_CLIENT_SECRET),
  PORT: Number(process.env.PORT),
  MONGOOSE_URI:String(process.env.MONGOOSE_URI),
  CLIENT_URL:String(process.env.CLIENT_URL),
  SESSION_SECRET:String(process.env.SESSION_SECRET)

};

export default config