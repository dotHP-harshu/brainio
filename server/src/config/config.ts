import dotenv from "dotenv"
dotenv.config()
interface ConfigInterface {
  PORT: number;
  GOOGLE_CLIENT_ID:string;
  GOOGLE_CLIENT_SECRET:string;
  MONGOOSE_URI:string;
  CLIENT_URL:string;
  SESSION_SECRET:string;
  OPEN_ROUTER_KEY:string
  GOOGLE_REDIRECT_URL:string
}

const config : ConfigInterface = {
  GOOGLE_CLIENT_ID:String(process.env.GOOGLE_CLIENT_ID),
  GOOGLE_CLIENT_SECRET:String(process.env.GOOGLE_CLIENT_SECRET),
  GOOGLE_REDIRECT_URL:String(process.env.GOOGLE_REDIRECT_URL),
  PORT: Number(process.env.PORT),
  MONGOOSE_URI:String(process.env.MONGOOSE_URI),
  CLIENT_URL:String(process.env.CLIENT_URL),
  SESSION_SECRET:String(process.env.SESSION_SECRET),
  OPEN_ROUTER_KEY:String(process.env.OPEN_ROUTER_KEY)

};

export default config