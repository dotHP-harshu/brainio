import app from "./app";
import config from "./config/config";

app.listen(config.PORT || 5000, () => {
  console.log(`Dev server running on port ${config.PORT || 5000}`);
});

export default app;
