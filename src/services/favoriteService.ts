import { Favorite } from "../models"

export const favoriteService = { 
    //Metodo para capturar os cursos favoritos de um usuario
    findByUserId: async ( userId: number) => {
        const favorites = await Favorite.findAll({
            where: {
                userId: userId
            },
            attributes: [['user_id', 'userId']],
            include: {
                association: 'Course',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                  ]
            }
        })

        return {
            userId, 
            courses: favorites.map( favorite => favorite.Course)
        }
    },

    //Metodo para inserir um curso nos favoritos 
    create: async (userId: number, courseId: number) => {
        const favorite = Favorite.create({
            courseId,
            userId
        })
        return favorite
    },

    //Metodo para deletar um curso nos favoritos 
    delete: async (userId: number, courseId: number) => {
        await Favorite.destroy({
          where: {
            userId: userId,
            courseId: courseId
          }
        })
    },

    //Metodo para checar se um curso está nos favoritos 
    isFavorite: async (userId: number, courseId: number) => {
        const favorite = await Favorite.findOne({
            where : {
                userId: userId,
                courseId: courseId
            }
        })
    
        return favorite !== null ? true : false
    }
}