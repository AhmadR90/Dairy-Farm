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
import businessMembershipRoutes from"./Routes/BusinessMembershipRoutes.js";
import teamMembershipRoutes from "./Routes/TeamMembershipRoutes.js";  
import permissionRoutes from "./Routes/PermissionRoutes.js"; 
import rolePermissionRoutes from"./Routes/RolePermissionRoutes.js"
import chatMessageRoutes from "./Routes/ChatRoutes.js";
import milestoneRoutes from"./Routes/MilestoneRoutes.js"
import projectMembershipRoutes from "./Routes/ProjectMembershipRoutes.js"
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
app.use("/api/business-memberships", businessMembershipRoutes);
app.use("/api/team-memberships", teamMembershipRoutes);
app.use("/api/permissions", permissionRoutes);
app.use('/api/role-permissions', rolePermissionRoutes);
app.use('/api/messages', chatMessageRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/memberships", projectMembershipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
