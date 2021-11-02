import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
	protected tableName = 'answers'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('question_id').notNullable().index()
			table.integer('score').nullable()
			table.string('answer', 1500).notNullable()
			table.boolean('is_choice').defaultTo(false)
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
