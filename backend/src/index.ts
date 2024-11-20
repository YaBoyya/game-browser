import dotenv from "dotenv";
import express, {Express} from "express";
import connectDB from "./config/database";
import gamesRoutes from "./routes/gamesRoutes";
import platformRoutes from "./routes/platformRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import publisherRoutes from "./routes/publisherRoutes";
import genreRoutes from "./routes/genreRoutes";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.BACKEND_DOCKER_PORT || "3000", 10);
connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/platform", platformRoutes);
app.use("/api/publisher", publisherRoutes);
app.use("/api/genre", genreRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Docker server is running at port: ${port}`);
    console.log(`[server]: Locally server should be available at http://localhost:${process.env.BACKEND_LOCAL_PORT}`);
});
