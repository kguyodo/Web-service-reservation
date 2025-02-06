import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: string = v4()

  @column()
  declare email: string

  @column()
  declare phoneNumber: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare address: string

  @column()
  declare addressDetails: string | null

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
