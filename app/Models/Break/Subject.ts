import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SubjectForm from './SubjectForm'
import Learning from './Learning'

export default class Subject extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public scheduleId: number

	@column()
	public learningId: number

	@column()
	public name: string

	@column()
	public type: string

	@column()
	public description?: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@hasMany(() => SubjectForm)
	public forms: HasMany<typeof SubjectForm>

	@belongsTo(() => Learning)
	public learning: BelongsTo<typeof Learning>
}
