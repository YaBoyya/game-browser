import express from "express";
import {createPlatform, deletePlaformById, getAllPlatforms} from "../controllers/platformController";

const platformRoutes = express.Router();

// @ts-ignore
platformRoutes.post("/", createPlatform);
platformRoutes.get("/", getAllPlatforms);
// @ts-ignore
platformRoutes.delete("/:platformId", deletePlaformById);
export default platformRoutes;
