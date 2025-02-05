import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {

    async login({request, response}: HttpContext) {
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

        return response.ok({
            type: 'bearer',
            value: token.value!.release(),
        })
    }

    async register({request, response}: HttpContext) {
        const { email, fullName, password } = request.body() as User
        const newUser = await User.create({
            email,
            fullName,
            password,
        })

        return response.created(newUser.serialize())
    }
}