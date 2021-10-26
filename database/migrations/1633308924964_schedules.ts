import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schedules extends BaseSchema {
  protected tableName = 'schedules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('counselor_id').index().unsigned().references('id').inTable('counselors')
      table.integer('subject_id').index().unsigned().notNullable().references('id').inTable('subjects')
      table.string('description')
      table.dateTime('start_date')
      table.dateTime('end_date')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
