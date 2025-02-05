import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().unique()
      table.string('email')
      table.string('phone_number')
      table.string('firstname')
      table.string('lastname')
      table.string('address')
      table.string('address_details').nullable()
      table.string('postal_code')
      table.string('city')
      table.string('company_name').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
