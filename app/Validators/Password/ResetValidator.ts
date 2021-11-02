import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetPasswordValidator {
	constructor(protected ctx: HttpContextContract) {}
	public schema = schema.create({
		password: schema.string({ trim: true }, [
			rules.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
			rules.confirmed(),
		]),
		token: schema.string(),
	})
	public messages = {}
}
