import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import memberRoutes from "./routes/member.routes.js";
import projectRouter from "./routes/project.routes.js"
import { swaggerDocs } from "./swagger.js";
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/members", memberRoutes);
app.use("/api/projects", projectRouter)
swaggerDocs(app)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
