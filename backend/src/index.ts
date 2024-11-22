import dotenv from "dotenv";
import express, {Express} from "express";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import gameRoutes from "./routes/gameRoutes";
import genreRoutes from "./routes/genreRoutes";
import platformRoutes from "./routes/platformRoutes";
import publisherRoutes from "./routes/publisherRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = parseInt(process.env.BACKEND_DOCKER_PORT || "3000", 10);
connectDB();

app.use(
    cors({
        origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/publishers", publisherRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Docker server is running at port: ${port}`);
    console.log(`[server]: Locally server should be available at http://localhost:${process.env.BACKEND_LOCAL_PORT}`);
});
