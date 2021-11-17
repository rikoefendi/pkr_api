import { DateTime } from 'luxon'
import {  BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import User from '../User'
import File from '../File'
import Subject from '../Subject'

export default class UploadAudio extends BaseModel {
	@column({ isPrimary: true })
	public id: number
	
	@column()
	public userId: number
	
	@column()
	public subjectId: number
	
	@column()
	public fileId: number
	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>

	@belongsTo(() => File)
	public audio: BelongsTo<typeof File>

	@belongsTo(() => Subject)
	public subject: BelongsTo<typeof Subject>

	@computed()
	public responses: Array<any>
}
