import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserTrainings extends BaseSchema {
	protected tableName = 'user_trainings'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('user_id').index().references('id').inTable('users').onDelete('CASCADE')
			table.integer('training_id').index().references('id').inTable('trainings').onDelete('CASCADE')
			table.integer('status').defaultTo(0)
			table.string('message').nullable()
			/**
			 * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
			 */
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
