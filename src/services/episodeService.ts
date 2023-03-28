import path from "path"
import fs from "fs";
import { Response } from "express";

export const episodeService = {
    streamEpisodeToResponse: async ( res: Response, videoUrl: string, range: string | undefined) => {
        const filePath = path.join(__dirname, "..", "..", "uploads", videoUrl)
        const fileStat = fs.statSync(filePath)

        if (range) {
            //capturando o inicio e o final da parte especifica do video 
            const parts = range.replace(/bytes=/, '').split('-')

            const start = parseInt(parts[0], 10 ) 
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

            const chunkSize = (end - start) + 1

            const file = fs.createReadStream(filePath,{
                start: start, 
                end: end
            })

            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes', 
                'Content-Lenght': chunkSize, 
                'Content-Type': 'video/mp4'
            }

            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Lenght': fileStat.size, 
                'Content-Type': 'video/mp4'
            }

            res.writeHead(200, head)
            fs.createReadStream(filePath).pipe(res)
        }
    }
}