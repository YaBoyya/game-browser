import express from "express";
import {createPublisher, deletePublisherById, getAllPublishers} from "../controllers/publisherController";
import {checkAdminRole} from "../middleware/authMiddleware";

const publisherRoutes = express.Router();

publisherRoutes.post("/", checkAdminRole, createPublisher);
publisherRoutes.get("/", getAllPublishers);
publisherRoutes.delete("/:id", checkAdminRole, deletePublisherById);

export default publisherRoutes;
