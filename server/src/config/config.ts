import dotenv from "dotenv"
dotenv.config()
interface ConfigInterface {
  PORT: number;
}

const config : ConfigInterface = {
  PORT: Number(process.env.PORT),
};

export default config