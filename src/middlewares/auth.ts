// src/middlewares/auth.ts

import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserInstance } from '../models/User'
import { jwtService } from '../services/jwtService'
import { userService } from '../services/userService'

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null
}

//Função de autenticação de rotas
export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
  }

  const token = authorizationHeader.replace(/Bearer /, '')

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res.status(401).json({ message: 'Não autorizado: token inválido' })
    }

    const user = await userService.findByEmail((decoded as JwtPayload).email)
    req.user = user
    next()
  })
}

//Função de autenticação de rotas via query (usado nas rotas de stream)
export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { token } = req.query

    if (!token) {
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
    }

    if (typeof token !== 'string') {
        return res.status(401).json({ message: 'Não autorizado: token deve ser do tipo string' })
    }

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined') return res.status(401).json({ 
            message: 'Não autorizado: token inválido' 
        })

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })
}