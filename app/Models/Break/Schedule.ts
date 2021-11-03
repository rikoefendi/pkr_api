import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Training from './Training'
import Agenda from './Agenda'
import Subject from './Subject'

export default class Schedule extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public trainingId: number

	@column()
	public name: string

	@column()
	public description?: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@belongsTo(() => Training)
	public training: BelongsTo<typeof Training>

	@hasMany(() => Agenda)
	public agenda: HasMany<typeof Agenda>
	@hasMany(() => Subject)
	public subjects: HasMany<typeof Subject>
}
