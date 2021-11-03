import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Subject from './Subject'
import Schedule from './Schedule'

export default class Training extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	@slugify({
		strategy: 'shortId',
		fields: ['name'],
	})
	public slug: string

	@column()
	public name: string

	@column()
	public description: string

	@column()
	public quota: number

	@column()
	public status: number

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@hasMany(() => Subject)
	public subjects: HasMany<typeof Subject>

	@hasMany(() => Schedule)
	public schedules: HasMany<typeof Schedule>
}
