import express  from "express"
import { categoriesController } from "./controllers/categorieController"

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

export { router }