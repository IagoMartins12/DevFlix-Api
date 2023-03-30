import { Op } from "sequelize"
import { Course } from "../models"

//Logica dos controladores de cursos 
export const courseService = { 
    
    //Metodo para capturar um curso especifico e os episodios dele
    findByIdWithEpisodes: async (id: string ) => {
        const courseWithEpisodes = await Course.findByPk( id, {
            attributes : ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            include: {
                association: 'episodes', 
                attributes: ['id', 'name', 'synopsis', 'order', ['video_url', 'videoUrl'], ['seconds_long', 'secondsLong']],
                order: [['order', 'ASC']],
                separate: true

            }, 
        })

        return courseWithEpisodes
    }, 

    //Metodo para capturar os cursos em destaques(sempre vem aleatorio)
    getRandomFeaturedCourses: async( ) => {
        const featuredCourses = await Course.findAll({
            attributes: ['id','name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            where: { 
                featured: true
            }
        })

        const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())

        return randomFeaturedCourses.slice(0, 3)
    },

    //Metodo para capturar os 10 primeiros cursos
    getTopTenNewest: async () => {
        const courses = Course.findAll({
            limit: 10,
            order: [['created_at', 'DESC']]
        })

        return courses 

    }, 

    //Metodo para pesquisa de cursos 
    findByName: async( name: string, page: number, perPage: number ) => {
        const offset = ( page - 1) * perPage
        const { count, rows } = await Course.findAndCountAll({
            attributes : ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            where: {
                name: {
                    [Op.iLike] : `%${name}%`
                }
            }, 
            limit: perPage, 
            offset: offset
        })

        return {
            courses: rows,
            page: page, 
            perPage: perPage, 
            total: count
        }
    },

    //Metodo para capturar os 10 cursos mais populares
    getTopTenByLikes: async () => {
        const results = await Course.sequelize?.query(
          `SELECT
            courses.id,
            courses.name,
            courses.synopsis,
            courses.thumbnail_url AS thumbnailUrl,
            COUNT(users.id) AS likes
          FROM courses
            LEFT OUTER JOIN likes
              ON courses.id = likes.course_id
              INNER JOIN users
                ON users.id = likes.user_id
          GROUP BY courses.id
          ORDER BY likes DESC
          LIMIT 10;`
        )
    
        if (results) {
          const [topTen, metadata] = results
          return topTen
        } else {
          return null
        }
    },
}