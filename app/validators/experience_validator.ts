import vine from '@vinejs/vine'

export const createExperienceValidator = vine.compile(
    vine.object({
        name: vine.string(),
        description: vine.string().optional(),
        difficulty: vine.number()
    })
) 