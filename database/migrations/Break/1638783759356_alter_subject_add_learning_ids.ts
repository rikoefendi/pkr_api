import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterSubjectAddLearningIds extends BaseSchema {
  protected tableName = 'subjects'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('learning_id').nullable().index()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
