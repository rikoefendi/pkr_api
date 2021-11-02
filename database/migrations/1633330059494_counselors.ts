import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Counselors extends BaseSchema {
	protected tableName = 'counselors'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('file_id').index().unsigned().references('id').inTable('files')
			table.string('name')
			table.string('description')

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
