import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public evaluationId: number

  @column()
  public question: string

  @column()
  public isChallenge: boolean | undefined = false

  @column()
  public isScore: number = 0

  @column()
  public isChoice: boolean | undefined = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Answer, {
    onQuery(query){
      query.where('is_choice', 'FALSE')
    }
  })
  public choices: HasMany<typeof Answer>

  @hasOne(() => Answer, {
    onQuery(query){
      query.where('is_choice', 'TRUE')
    }
  })
  public answer: HasOne<typeof Answer>

}
