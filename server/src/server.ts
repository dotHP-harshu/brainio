import app from "./app";
// import config from "./config/config";
import dbConnection from "./config/dbConnection";

export default async function handler(req: any, res: any) {
  await dbConnection();
  return app(req, res);
}

// dbConnection()
//   .then(() => {
//     console.log("Database connected");
//     app.listen(config.PORT || 3000, () => {
//       console.log("Server start running on port 3000");
//     });
//   })
//   .catch((error) => {
//     console.log("there is a error on connecting database.", error);
//   });
