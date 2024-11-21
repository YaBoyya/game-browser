import {Request, Response} from "express";
import PublisherService from "../services/publisherService";

export const createPublisher = async (req: Request, res: Response) => {
    try {
        const {name, desc, established} = req.body;

        const existingPublisher = await PublisherService.getPublisherByName(name);
        if (existingPublisher) {
            res.status(400).json({message: "Publisher with the same name already exists"});
            return;
        }

        const newPublisher = {
            name: name,
            description: desc || null,
            established: new Date(established)
        };

        const createdPublisher = await PublisherService.createPublisher(newPublisher);

        res.status(201).json({
            message: "Publisher created successfully",
            publisher: createdPublisher
        });
    } catch (error) {
        console.error("Error creating publisher:", error);
        if (error instanceof Error) {
            res.status(500).json({message: "Server error: " + error.message});
        } else {
            res.status(500).json({message: "Server error"});
        }
    }
};

export const getAllPublishers = async (_req: Request, res: Response) => {
    try {
        const publishers = await PublisherService.getAllPublishers();
        res.status(200).json(publishers);
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const deletePublisherById = async (req: Request, res: Response) => {
    const publisherId = req.params.id as string;

    try {
        const existingPublisher = await PublisherService.getPublisherById(publisherId);
        if (!existingPublisher) {
            res.status(404).json({message: "Publisher not found"});
            return;
        }

        await PublisherService.deletePublisherById(publisherId);
        res.status(200).json({message: "Publisher deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};
