import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public question: string
  
  @column()
  public virtualId?: number
  
  @column()
  public questionId?: number
  
  @column()
  public actions?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Question)
  public questions: HasMany<typeof Question>

}
