import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterSubjectAddVirtualIds extends BaseSchema {
  protected tableName = 'subjects'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('virtual_id').nullable().index()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
