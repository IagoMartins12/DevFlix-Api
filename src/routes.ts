import express  from "express"
import { authController } from "./controllers/authController"
import { categoriesController } from "./controllers/categorieController"
import { coursesController } from "./controllers/coursesController"
import { episodesController } from "./controllers/episodesController"
import { favoriteController } from "./controllers/favoriteController"
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth"

const router = express.Router()

//auth endpoints
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)


//categories endpoints
router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

//courses endpoints
router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

//episodes endpoints 
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)

//favorites endpoints 
router.get('/favorites', ensureAuth, favoriteController.index)
router.post('/favorites', ensureAuth, favoriteController.save)

export { router }