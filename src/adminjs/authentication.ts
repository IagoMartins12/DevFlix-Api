import { AuthenticationOptions } from "@adminjs/express";
import { User } from "../models";
import bcrypt from 'bcrypt'

//Metodo de autenticação do adminjs
export const authenticationOption : AuthenticationOptions = {
    authenticate: async (email, password) => {
      const user = await User.findOne({where: { email: email} } ) 
  
      if (user && user.role === 'admin') {
        const matched = await bcrypt.compare(password, user.password)
  
        if (matched){
          return user
        }
  
      } 
  
      return false 
    }, 
    cookiePassword: 'senha-de-cookie',
  }