import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

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
}
