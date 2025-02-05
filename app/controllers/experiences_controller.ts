import Experience from '#models/experience'
import { createExperienceValidator } from '#validators/experience_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExperiencesController {

    /**
     * @getExperiences
     * @summary Retrieve all experiences from DB
     * @responseBody 200 - <Experience[]>
     */
    async getExperiences({response}: HttpContext) {

        const experiences = await Experience.all()
        return response.ok(experiences)
    }

    /**
     * @createExperience
     * @summary Create a new experience
     * @requestBody <createExperienceValidator>
     * @responseBody 201 - <Experience>
     */
    async createExperience({request, response}: HttpContext) {

        const requestBody = await createExperienceValidator.validate(request.body() as Experience)
        const createdExperience = await Experience.create(requestBody)
        return response.created(createdExperience)
    }

    /**
     * @deleteExperience
     * @responseBody 204 - Experience deleted successfuly
     */
    async deleteExperience({params, response}: HttpContext) {

        const experienceToDelete = await Experience.findOrFail(params.id)
        experienceToDelete.delete()
        return response.status(204)
    }
}