import vine from '@vinejs/vine'

export const customerValidatorUpdate = vine.compile(
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

export const customerValidatorCreate = vine.compile(
  vine.object({
    email: vine.string().email(),
    phoneNumber: vine.string().mobile(),
    firstname: vine.string(),
    lastname: vine.string(),
    address: vine.string(),
    addressDetails: vine.string().optional(),
    postalCode: vine.string().postalCode(),
    city: vine.string(),
    companyName: vine.string().optional(),
  })
)
