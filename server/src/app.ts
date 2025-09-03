import express from "express";
import { setupSwagger } from "./config/swagger-config";
import dotenv from "dotenv";
const apiRoutes = require("./routes");
const cors = require("cors");
import rateLimit from "express-rate-limit";

dotenv.config();

const port = Number(process.env.PORT);
const app = express();

app.use(
  cors({
    origin: process.env.REACT_BASE_URL,
    credentials: true,
  }),
);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(express.json());
setupSwagger(app);
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
