import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class ConversationQuestions extends BaseSchema {
  protected tableName = 'conversation_question'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('conversation_id').index().unsigned().references('id').inTable('conversations')
      table.integer('question_id').index().unsigned().references('id').inTable('questions')
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
