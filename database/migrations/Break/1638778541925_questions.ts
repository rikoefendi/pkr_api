import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { cans } from 'App/Models/Break/Question'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('virtual_id').index().nullable().references('id').inTable('virtuals').onDelete('cascade')
      table.integer('question_id').index().nullable().references('id').inTable('questions').onDelete('cascade')
      table.text('question').notNullable()
      table.text('comment').nullable()
      table.string('actions').nullable()
      table.enum('can', cans).notNullable()
      table.enum('type', cans).notNullable()
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
