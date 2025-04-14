import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/AuthRouter.js";
import otpRoutes from "./Routes/ResetPassowrd.js";
import resetPass from "./Routes/UpdatePassword.js";
import TeamRoutes from "./Routes/TeamRoutes.js";
import businessRoutes from "./Routes/BussinessRoutes.js";
import roleRoutes from "./Routes/roleRoutes.js";
import projectRoutes from"./Routes/projectRoutes.js"
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/auth", otpRoutes);
app.use("/api/reset", resetPass);
app.use("/api/Team", TeamRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
