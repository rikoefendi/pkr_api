import { DateTime } from 'luxon'
import { BaseModel, column, computed, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
export const MessageTypes = ['parent', 'patient', 'counselor'] as const
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import User from '../User'
import Env from '@ioc:Adonis/Core/Env'
const BASE_URL = Env.get('BASE_URL')
const Avatars = {
    'counselor-male': `${BASE_URL}/counselor-male.png`,
    'counselor-female': `${BASE_URL}/counselor-female.png`,
    'parent': `${BASE_URL}/parent.png`,
    'patient-male': `${BASE_URL}/patient-male.png`,
    'patient-female': `${BASE_URL}/patient-female.png`,
}
export const MessageStaging = ['ENGAGING', 'FOCUSING', 'EVOKING', 'PLANNING'] as const
export default class Message extends BaseModel {
  public user?: User
  public learningGender?: String
  constructor() {
    super()
    const ctx = HttpContext.get()
    this.user = ctx?.auth.user
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public message: string

  @column()
  public comment?: string

  @column()
  public actions?: string

  @column()
  public stage?: typeof MessageStaging[number]

  @column()
  public type: typeof MessageTypes[number]
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Message, {
    pivotTable: 'repplies',
    pivotForeignKey: 'message_id_repply'
  })
  public messages: ManyToMany<typeof Message>


  @computed()
  public get name() {
    return this.type === 'counselor' ? this.user?.name : this.type === 'parent' ? 'Orang Tua' : 'Pasien'
  }

  @computed()
  public get avatar() {
    const gender = this.type === 'counselor' ? this.user?.gender : this.learningGender
    const genderAvatar = gender === 'LAKI-LAKI' ? 'male' : 'female'
    return Avatars[this.type == 'parent' ? 'parent' : this.type + '-' + genderAvatar]
  }
}

// private generateAddtionalDataMessage(message, user) {
//   const isCounselor = message.type === 'counselor'
//   message.name = isCounselor ? user?.name : message.type === 'parent' ? 'Orang Tua' : 'Pasien'

//   return message
// }