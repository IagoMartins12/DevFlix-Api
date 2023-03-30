import { filterLastEpisodesByCourse } from "../helpers/filterLastEpisodesByCourse"
import { User } from "../models"
import { UserCreationAttributes } from "../models/User"

export const userService = {
    //Metodo para achar um usuario com base no email 
    findByEmail : async (email: string ) => {
        const user = await User.findOne({
            where: {
                email : email
            }
        })
        return user
    },

    //Metodo para criar um usuario
    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)

        return user
    }, 

    update: async (id: number, attributes: {
      firstName: string 
      lastName: string
      phone: string
      birth: Date
      email: string
    }) => {
      const [affectedRows, updatedUsers] = await User.update(attributes, { 
        where: { id }, 
        returning: true})

      return updatedUsers[0]
    },

    //Metodo para atualizar a senha 
    updatePassword: async ( id: number, password: string) => {
      const [affectedRows, updatedUsers] = await User.update({ password }, 
        { where: { id }, 
        returning: true,
        individualHooks: true //Usado para rodar o hook feito no model 
      })

      return updatedUsers[0]
    },

    //Metodo para verificar se o usuario possui um episodio que não foi concluido
    getKeepWatchingList: async (id: number) => {
        const userWithWatchingEpisodes = await User.findByPk(id, {
          include: {
            association: 'Episodes',
            attributes: [
              'id',
              'name',
              'synopsis',
              'order',
              ['video_url', 'videoUrl'],
              ['seconds_long', 'secondsLong'],
              ['course_id', 'courseId']
            ],
            include: [{
              association: 'Course',
              attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
              ],
              as: 'course'
            }],
            through: {
              as: 'watchTime',
              attributes: [
                'seconds',
                ['updated_at', 'updatedAt']
              ]
            }
          }
        })
    
        if (!userWithWatchingEpisodes) throw new Error('Usuário não encontrado.')

        const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!) 
        // @ts-ignore
        keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1)
        return keepWatchingList
    }, 
    
}