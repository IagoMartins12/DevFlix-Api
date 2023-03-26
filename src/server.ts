// src/server.ts

import express from 'express'
import { adminJs, adminJsRouter } from './adminjs'
import { database } from './database'

const app = express()

//Indicando arquivos estaticos
app.use(express.static('public'))

//app.use(caminho, rotas)
app.use(adminJs.options.rootPath, adminJsRouter)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
  database.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})