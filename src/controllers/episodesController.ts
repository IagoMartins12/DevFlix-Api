import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { episodeService } from "../services/episodeService";

export const episodesController = { 
    // GET / episodes /stream?videoURl=
    stream: async( req : Request, res : Response) => {
        const { videoUrl } = req.query

        try {
            if (typeof videoUrl !== 'string') throw new Error ('videoUrl param must be of type string')

            //Usado para capturar a parte especifica que o usuario quer
            const range = req.headers.range
            episodeService.streamEpisodeToResponse(res, videoUrl, range)

        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({ message: err.message})
            }
        }
    }
}