import vine from '@vinejs/vine'

export const customerValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    phoneNumber: vine.string().mobile().optional(),
    firstname: vine.string().optional(),
    lastname: vine.string().optional(),
    address: vine.string().optional(),
    addressDetails: vine.string().optional(),
    postalCode: vine.string().postalCode().optional(),
    city: vine.string().optional(),
    companyName: vine.string().optional(),
  })
)

// const data = getDataToValidate()
// await vine.validate({ schema, data })
