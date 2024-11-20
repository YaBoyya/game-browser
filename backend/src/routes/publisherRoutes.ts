import express from "express";
import {createPublisher, deletePublisherById, getAllPublishers} from "../controllers/publisherController";

const publisherRoutes = express.Router();

// @ts-ignore
publisherRoutes.post("/", createPublisher);
publisherRoutes.get("/", getAllPublishers);
// @ts-ignore
publisherRoutes.delete("/:id", deletePublisherById);

export default publisherRoutes;