import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { MessageStaging } from 'App/Models/Break/Message'

export default class MessagAddFieldStages extends BaseSchema {
  protected tableName = 'messages'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('stage', MessageStaging).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
