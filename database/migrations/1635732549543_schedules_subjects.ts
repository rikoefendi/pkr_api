import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SchedulesSubjects extends BaseSchema {
  protected tableName = 'schedules_subjects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('schedule_id')
      table.integer('subject_id')

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
