import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const UsersController = () => import('#controllers/users_controller')
const MailController = () => import('#controllers/mail_controller')
const ExperiencesController = () => import('#controllers/experiences_controller')
const BookingsController = () => import('#controllers/bookings_controller')
const CustomersController = () => import('#controllers/customers_controller')

// Returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router.get('/', () => {
  name: 'Hello World young frog'
})

router
  .group(() => {
    router.get('/:id', [CustomersController, 'getOneCustomer'])
    router.get('/', [CustomersController, 'getCustomers'])
    router.post('/', [CustomersController, 'postCustomer'])
    router.put('/:id', [CustomersController, 'putCustomer'])
  })
  .prefix('/customers')

router
  .group(() => {
    router.post('/login', [UsersController, 'login'])
    router.post('/register', [UsersController, 'register'])
  })
  .prefix('/users')

router.get('/send-mail', [MailController, 'sendEmail']).use(middleware.auth({ guards: ['api'] }))

router
  .group(() => {
    router.get('/', [ExperiencesController, 'getExperiences'])
    router
      .post('/', [ExperiencesController, 'createExperience'])
      .use(middleware.auth({ guards: ['api'] }))
    router
      .delete('/:id', [ExperiencesController, 'deleteExperience'])
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/experiences')

router
  .group(() => {
    router.get('/', [BookingsController, 'getBookings'])
    router
      .get('/:id', [BookingsController, 'getOneBooking'])
      .use(middleware.auth({ guards: ['api'] }))
    router.post('/', [BookingsController, 'createBooking'])
    router
      .put('/:id', [BookingsController, 'updateBooking'])
      .use(middleware.auth({ guards: ['api'] }))
    router
      .delete('/:id', [BookingsController, 'deleteBooking'])
      .use(middleware.auth({ guards: ['api'] }))
  })

  .prefix('/booking')
