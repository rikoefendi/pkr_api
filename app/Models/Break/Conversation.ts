import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'
import Virtual from './Virtual'
import User from '../User'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public virtualId: number

  @column()
  public userId: number

  @column()
  public label: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Question)
  public questions: ManyToMany<typeof Question>

  @belongsTo(() => Virtual)
  public virtual: BelongsTo<typeof Virtual>
  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
