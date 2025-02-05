import type { HttpContext } from '@adonisjs/core/http'

export default class ExperiencesController {

    getExperiences({request, response}: HttpContext) {

        console.log('GET Experience')
        return response.status(200)
    }

    createExperience({request, response}: HttpContext) {

        console.log(request.body)
        return response.status(201)
    }

    deleteExperience({request, response}: HttpContext) {

        console.log('DELETE Experience')
        return response.status(204)
    }
}