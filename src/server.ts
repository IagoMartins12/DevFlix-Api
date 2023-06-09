import express from 'express'
import { adminJs, adminJsRouter } from './adminjs'
import { database } from './database'
import { router } from './routes'
import cors from 'cors'


const formidableMiddleware = require('express-formidable');
const app = express()

app.use(formidableMiddleware({
  maxFileSize: 4 * 1024 * 1024 * 1024, // Set the maximum file size to 4GB
}))

//Indicando arquivos estaticos
app.use(express.static('public'))
app.use(express.json())

//app.use(caminho, rotas)
app.use(adminJs.options.rootPath, adminJsRouter)

//Cors é usado para liberar a api de ser acessado por lugares externos
app.use(cors())
app.use(router)


const PORT = process.env.port || 3000

app.listen(PORT, () => {
  database.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})
