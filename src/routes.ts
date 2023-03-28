import express  from "express"
import { authController } from "./controllers/authController"
import { categoriesController } from "./controllers/categorieController"
import { coursesController } from "./controllers/coursesController"
import { episodesController } from "./controllers/episodesController"

const router = express.Router()

//auth endpoints
router.post('/auth/register', authController.register)

//categories endpoints
router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

//courses endpoints
router.get('/courses/featured', coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', coursesController.search)
router.get('/courses/:id', coursesController.show)

//episodes endpoints 
router.get('/episodes/stream', episodesController.stream)
export { router }