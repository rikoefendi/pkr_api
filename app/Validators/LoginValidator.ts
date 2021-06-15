import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor (protected ctx: HttpContextContract) {
  }
  public schema = schema.create({
      email: schema.string({trim: true}, [
          rules.exists({table: 'users', column: 'email'})
      ])
  })
  public messages = {}
}
