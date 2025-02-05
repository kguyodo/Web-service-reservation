import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import hash from '@adonisjs/core/services/hash'
import { loginValidator, registerValidator } from '#validators/user_validator'

export default class UsersController {

    /**
     * @login
     * @summary Login an admin user 
     * @requestBody <loginValidator>
     * @responseBody 200 - {"type": "bearer", "value": "yourBearerToken"}
     * 
     */
    async login({request, response}: HttpContext) {
        const requestBody = await loginValidator.validate(request.body() as User) 
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

    /**
     * @register
     * @summary Register a new admin user (used for test only)
     * @requestBody <registerValidator>
     * @responseBody 201 - <User>
     */
    async register({request, response}: HttpContext) {
        const user = await registerValidator.validate(request.body() as User)
        const newUser = await User.create({...user})

        return response.created(newUser.serialize())
    }
}