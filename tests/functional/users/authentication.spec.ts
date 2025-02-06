import User from '#models/user'
import { assertNotNull } from '@adonisjs/core/helpers/assert';
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'

type BearerToken = {
  type: string;
  value: string;
};

test.group('Users create', (group) => {

  let bearerTokenValue: string

  group.teardown(async () => {
    const adminUsersCreatedByTests = await User.findManyBy('email', 'admin@gmail.com')
    adminUsersCreatedByTests.forEach(user => user.delete())
  })

  test('Hashes user password when creating a new user', async ({ assert }) => {
    const user = new User()
    user.email = 'admin@gmail.com'
    user.password = 'secret'
    user.fullName = 'Admin'
    
    await user.save()
    
    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, 'secret'))
  })

  test('Login an admin', async ({ assert, client }) => {
    const response = await client.post('/users/login').json({
      email: 'admin@gmail.com',
      password: 'secret'
    })

    response.assertStatus(200)
    const body: BearerToken = response.body()
    assert.strictEqual(body.type, "bearer")
    assertNotNull(body.value)

    bearerTokenValue = body.value
  })

  test('Access securized endpoint', async ({ client }) => {
    const response = await client.get('/customers')
    response.assertStatus(401)

    const authenticatedResponse = await client.get('/customers').bearerToken(bearerTokenValue)
    authenticatedResponse.assertStatus(200)
  })
})