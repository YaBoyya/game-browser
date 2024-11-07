import {Request, Response} from "express";
import {PlatformDTO} from "../dto/platformDTO";
import PlatformService from "../services/platformService";

export const createPlatform = async (req: Request, res: Response) => {
    try {
        const {name, desc} = req.body;

        const newPlatorm: PlatformDTO = {
            name: name,
            description: desc || null
        };

        const createdPlatform = await PlatformService.createPlatform(newPlatorm);

        res.status(201).json({
            message: "Platform created successfully",
            platform: createPlatform
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
