import express from "express";
import {createPublisher, deletePublisherById, getAllPublishers} from "../controllers/publisherController";
import {checkAdminRole} from "../middleware/authMiddleware";

const publisherRoutes = express.Router();

// @ts-ignore
publisherRoutes.post("/",checkAdminRole, createPublisher);
publisherRoutes.get("/", getAllPublishers);
// @ts-ignore
publisherRoutes.delete("/:id",checkAdminRole, deletePublisherById);

export default publisherRoutes;