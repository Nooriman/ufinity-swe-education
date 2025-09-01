import express from "express";
import { setupSwagger } from "./config/swagger-config";
import dotenv from "dotenv";
const apiRoutes = require("./routes");

dotenv.config();

const port = Number(process.env.PORT);
const app = express();

app.use(express.json());
setupSwagger(app);
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
