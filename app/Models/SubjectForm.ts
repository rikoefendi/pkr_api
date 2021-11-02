import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubjectForm extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public subjectId: number

	@column()
	public formId: string

	@column()
	public canAccess: string

	@column()
	public label?: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
