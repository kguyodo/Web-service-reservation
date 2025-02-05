import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { middleware } from './kernel.js'
import { Exception } from '@adonisjs/core/exceptions'
import hash from '@adonisjs/core/services/hash'

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
    router.post('/login', async ({ request }) => {
      const requestBody = request.body() as User
      const user = await User.query().where('email', requestBody.email).firstOrFail()

      if (!user) {
        throw new Exception('User does not exist', { status: 404 })
      }

      // Check that the basic password and the password of the user who wants to connect are the same
      const isValidPassword = await hash.verify(user.password, requestBody.password)
      if (!isValidPassword) {
        throw new Exception('User does not exist', { status: 404 })
      }

      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '1 day' })

      return {
        type: 'bearer',
        value: token.value!.release(),
      }
    })

    router.post('/register', async ({ request }) => {
      const { email, fullName, password } = request.body() as User
      const newUser = await User.create({
        email,
        fullName,
        password,
      })

      return newUser.serialize()
    })
  })
  .prefix('/users')
