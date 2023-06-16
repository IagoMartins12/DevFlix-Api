import express  from "express"
import { authController } from "./controllers/authController"
import { categoriesController } from "./controllers/categorieController"
import { coursesController } from "./controllers/coursesController"
import { episodesController } from "./controllers/episodesController"
import { favoriteController } from "./controllers/favoriteController"
import { likesController } from "./controllers/likeController"
import { usersController } from "./controllers/userController"
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
router.get('/courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/:id', ensureAuth, coursesController.show)

//episodes endpoints 
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)
router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)

//favorites endpoints 
router.get('/favorites', ensureAuth, favoriteController.index)
router.post('/favorites', ensureAuth, favoriteController.save)
router.delete('/favorites/:id', ensureAuth, favoriteController.delete)

//like endpoints
router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.delete)

//users endpoints
router.get('/users/current/watching', ensureAuth, usersController.watching)
router.put('/users/current', ensureAuth, usersController.update)
router.put('/users/current/password', ensureAuth, usersController.updatePassword)
router.get('/users/current', ensureAuth, usersController.show)

export { router }