import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id?: string = v4()

  @column.dateTime({ autoCreate: true })
  declare createdAt?: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt?: DateTime

  @column.dateTime()
  declare startDateTime?: DateTime

  @column()
  declare durationTime: number

  @column()
  declare experienceId: number

  @column()
  declare customerId: string

  @column()
  declare playersNumber: number

  @column()
  declare comment: string
}
