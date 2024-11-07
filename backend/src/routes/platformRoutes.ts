import express from "express";
import {createPlatform} from "../controllers/platformController";

const platformRoutes = express.Router();

platformRoutes.post("/", createPlatform);

export default platformRoutes;
