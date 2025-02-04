import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index()
      table.date('date')
      table.time('start_hour')
      table.integer('duration_time')
      table.integer('players_number')
      table.bigint('experience_id')
      table.uuid('customer_id')
      table.string('comment').nullable()

      table.foreign('experience_id').references('experiences.id')
      table.foreign('customer_id').references('customers.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}