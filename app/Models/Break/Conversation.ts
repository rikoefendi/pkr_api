import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import Learning from './Learning'
import User from '../User'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public learningId: number

  @column()
  public userId: number

  @column()
  public label: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Message, {
    pivotTimestamps: true
  })
  public messages: ManyToMany<typeof Message>

  @belongsTo(() => Learning)
  public learning: BelongsTo<typeof Learning>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @computed()
  public count: number
}
