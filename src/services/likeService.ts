// src/services/likeService.ts

import { Like } from "../models/Like"

export const likeService = {
  //Metodo para inserir um curso no gostei 
  create: async (userId: number, courseId: number) => {
    const like = await Like.create({
      userId,
      courseId
    })

    return like
  },

  //Metodo para deletar um curso no gostei 
  delete: async (userId: number, courseId: number) => {
    await Like.destroy({
      where: {
        userId,
        courseId
      }
    })
  },

  //Metodo para checkar se o curso ja tem um like 
  isLiked: async (userId: number, courseId: number ) => {
    const like = await Like.findOne({
        where : {
            userId: userId,
            courseId: courseId
        }
    })

    return like !== null ? true : false
  }
}