import vine from '@vinejs/vine'

export const createBookingValidator = vine.compile(
  vine.object({
    startDateTime: vine.date(),
    durationTime: vine.number(),
    playersNumber: vine.number(),
    experienceId: vine.number(),
    customerId: vine.string(),
    comment: vine.string().optional(),
  })
)

export const updateBookingValidator = vine.compile(
  vine.object({
    startDateTime: vine.date().optional(),
    durationTime: vine.number().optional(),
    playersNumber: vine.number().optional(),
    experienceId: vine.number().optional(),
    customerId: vine.string().optional(),
    comment: vine.string().optional(),
  })
)
