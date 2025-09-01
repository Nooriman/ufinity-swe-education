const express = require("express");
const apiRoutes = require("./routes");
import { setupSwagger } from "./config/swagger-config";

const app = express();

setupSwagger(app);
app.use("/api", apiRoutes);

app.listen(4000, () => {
  console.log(`Server is running on port: 4000`);
});
