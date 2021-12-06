import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Virtual extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string
  
  @column()
  public description?: string
  
  @column()
  public prologue?: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Question)
  public questions: HasMany<typeof Question>
}
