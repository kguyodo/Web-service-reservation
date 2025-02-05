import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const ExperiencesController = () => import('#controllers/experiences_controller')
const UsersController = () => import('#controllers/users_controller')

router
  .get('/', () => {
    return { name: 'Hello World young frog' }
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router.group(() => {
  router.post('/login', [UsersController, 'login'])
  router.post('/register', [UsersController, 'register'])
})
.prefix('/users')

router.group(() => {
  router.get('/', [ExperiencesController, 'getExperiences'])
  router.post('/', [ExperiencesController, 'createExperience'])
  router.delete('/', [ExperiencesController, 'deleteExperience'])
})
.prefix('/experiences')
