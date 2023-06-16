import jwt from 'jsonwebtoken'

const secret = 'chave-do-jwt'

export const jwtService = {
    //Metodo para criar um token de autenticação
    signPayload: (payload: string | object | Buffer, expiration: string) => {
      return jwt.sign(payload, secret, { expiresIn: expiration })
    },

    //Metodo para verificar um token de autenticação  
    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
      jwt.verify(token, secret, callbackfn)
    }
}