import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string()
    })
)

export const registerValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email(),
        password: vine.string().trim().minLength(8),
        fullName: vine.string()
    })
)