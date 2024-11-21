import express from "express";
import {createPlatform, deletePlaformById, getAllPlatforms} from "../controllers/platformController";
import {checkAdminRole} from "../middleware/authMiddleware";

const platformRoutes = express.Router();

platformRoutes.post("/", checkAdminRole, createPlatform);
platformRoutes.get("/", getAllPlatforms);
platformRoutes.delete("/:platformId", checkAdminRole, deletePlaformById);
export default platformRoutes;
