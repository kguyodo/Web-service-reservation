import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CustomersController from '#controllers/customers_controller'

const UsersController = () => import('#controllers/users_controller')
const MailController = () => import('#controllers/mail_controller')
const ExperiencesController = () => import('#controllers/experiences_controller')

router
  .get('/', () => {
    return { name: 'Hello World young frog' }
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router
  .group(() => {
    router.get('/getone/:id', [CustomersController, 'getOneCustomer'])
    router.get('/getall', [CustomersController, 'getCustomers'])
    router.post('/create', [CustomersController, 'postCustomer'])
    router.put('/update/:id', [CustomersController, 'putCustomer'])
  })

  .prefix('/customer')

router.group(() => {
  router.post('/login', [UsersController, 'login'])
  router.post('/register', [UsersController, 'register'])
})
.prefix('/users')

router.get('/send-mail', [MailController, 'sendEmail']).use(middleware.auth({ guards: ['api'] }))

router.group(() => {
  router.get('/', [ExperiencesController, 'getExperiences'])
  router.post('/', [ExperiencesController, 'createExperience']).use(middleware.auth({ guards: ['api'] }))
  router.delete('/:id', [ExperiencesController, 'deleteExperience']).use(middleware.auth({ guards: ['api'] }))
})
.prefix('/experiences')
