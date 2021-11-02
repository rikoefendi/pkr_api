import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailValidator {
	constructor(protected ctx: HttpContextContract) {}
	public schema = schema.create({
		email: schema.string({ trim: true }, [rules.regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)]),
	})
	public messages = {}
}
