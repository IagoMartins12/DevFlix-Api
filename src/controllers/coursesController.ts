import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { Course } from "../models";
import { courseService } from "../services/coursesService";
import { favoriteService } from "../services/favoriteService";
import { likeService } from "../services/likeService";

export const coursesController = { 
    // GET /courses/featured
    featured: async( req: Request, res: Response) => {
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses()
            return res.json(featuredCourses)
        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({ message: err.message})
            }
        }
    },

    //GET /courses/newest
    newest: async( req: Request, res: Response) => {
        try {
            const newestCourses = await courseService.getTopTenNewest()
            return res.json(newestCourses)
        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({ message: err.message})
            }
        }
    }, 

    //GET / courses/ popular
    popular: async( req: Request, res: Response) => {
        try {
            const topTen = await courseService.getTopTenByLikes()
            return res.json(topTen)
        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({ message: err.message})
            }
        }
    },

    //GET /courses/search
    search: async( req: Request, res: Response) => {
        const { name } = req.query
        const [ page, perPage] = getPaginationParams( req.query )
        
        try {
            if (typeof name !== 'string'){
                throw new Error ('name param must be of type string')
            }

            const searchCourses = await courseService.findByName(name, page, perPage)

            return res.json(searchCourses)
        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({ message: err.message})
            }
        }
    },

    // GET / courses/:id 
    show: async( req: AuthenticatedRequest, res: Response) => {
        const courseId = req.params.id
        const userId = req.user!.id

        try {
            const course = await courseService.findByIdWithEpisodes(courseId)

            if (!course) {
                return res.status(404).json({ message: 'Curso não encontrado'})
            }
            const liked = await likeService.isLiked(userId, Number(courseId))
            const favorited = await favoriteService.isFavorite(userId, Number(courseId))
            return res.json({...course.get(), liked, favorited})

        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({ message: err.message})
            }
        }
    }

}