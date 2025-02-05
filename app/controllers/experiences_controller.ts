import type { HttpContext } from '@adonisjs/core/http'

export default class ExperiencesController {

    createExperience({request, response}: HttpContext) {

        console.log(request.body);
        return response.status(201);
    }
}