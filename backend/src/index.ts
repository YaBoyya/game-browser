import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.BACKEND_DOCKER_PORT || "3000", 10);

app.get("/", (req: Request, res: Response) => {
  res.send("Game Browser");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`[server]: Docker server is running at port: ${port}`);
  console.log(`[server]: Locally server should be available at http://localhost:${process.env.BACKEND_LOCAL_PORT}`);
});