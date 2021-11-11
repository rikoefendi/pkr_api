import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UploadAudios extends BaseSchema {
	protected tableName = 'upload_audios'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('user_id').index().references('id').inTable('users').onDelete('CASCADE')
			table.integer('file_id').index().references('id').inTable('files').onDelete('CASCADE')
			table.integer('subject_id').index().references('id').inTable('subjects').onDelete('CASCADE')
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
