const express = require("express");
const apiRoutes = require("./routes");
import { setupSwagger } from "./config/swagger-config";

const dotenv = require("dotenv");
dotenv.config();

const port = Number(process.env.PORT);
const app = express();

setupSwagger(app);
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
