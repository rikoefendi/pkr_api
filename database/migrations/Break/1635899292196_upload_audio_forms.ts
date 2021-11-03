import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UploadAudioForms extends BaseSchema {
	protected tableName = 'upload_audio_forms'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('upload_audio_id').index().references('id').inTable('upload_audios')
			table.integer('form_id').index()
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
