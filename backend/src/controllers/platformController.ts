import {Request, Response} from "express";
import {PlatformDTO} from "../dto/platformDTO";
import PlatformService from "../services/platformService";

export const createPlatform = async (req: Request, res: Response) => {
    try {
        const {name, desc} = req.body;

        const existingPlatform = await PlatformService.getPlatformByName(name);
        if (existingPlatform) {
            return res.status(400).json({message: "Platform with the same name already exists"});
        }

        const newPlatform: PlatformDTO = {
            name: name,
            description: desc || null
        };

        const createdPlatform = await PlatformService.createPlatform(newPlatform);

        res.status(201).json({
            message: "Platform created successfully",
            platform: createdPlatform
        });
    } catch (error) {
        console.error("Error creating platform:", error);
        if (error instanceof Error) {
            res.status(500).json({message: "Server error: " + error.message});
        } else {
            res.status(500).json({message: "Server error"});
        }
    }
};

export const getAllPlatforms = async (_req: Request, res: Response) => {
    try {
        const platforms = await PlatformService.getAllPlatforms();
        res.status(200).json(platforms);
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const deletePlaformById = async (req: Request, res: Response) => {
    const platformId = req.params.platformId;

    try {
        const existingPlatform = await PlatformService.getPlatformById(platformId);
        if (!existingPlatform) {
            return res.status(404).json({message: "Platform not found"});
        }

        await PlatformService.deletePlatformById(platformId);
        res.status(200).json({message: "Platform deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
}

