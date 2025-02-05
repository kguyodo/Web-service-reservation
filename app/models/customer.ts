import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare phoneNumber: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare adress: string

  @column()
  declare adressDetails: string | null

  @column()
  declare postalCode: string

  @column()
  declare city: string

  @column()
  declare companyName: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
