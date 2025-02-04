import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { middleware } from './kernel.js'

router.get('/', () => {
  return { "name": "Hello World young frog" }
}).use(middleware.auth({
  guards: ['api']
}))

router.post('users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user, ['*'], {expiresIn: "1 day"})

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
})

router.post('users', async ({request}) => {
  const { email, fullName, password } = request.body as unknown as User
  const test = await User.create({
    email,
    fullName,
    password
  })

  return test.serialize()
})