import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSubjects extends BaseSchema {
	protected tableName = 'user_subjects'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('user_id').index().references('id').inTable('users')
			table.integer('subject_id').index().references('id').inTable('subject_forms')
			table.string('file_id').index().nullable()
			table.string('score').nullable()
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
