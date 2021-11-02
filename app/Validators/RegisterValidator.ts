import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string({ trim: true }, [rules.minLength(4), rules.maxLength(20)]),
		email: schema.string({ trim: true }, [
			rules.unique({ table: 'users', column: 'email' }),
			rules.regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
		]),
		password: schema.string({ trim: true }, [
			rules.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
			rules.confirmed(),
		]),
	})
	public messages = {}
}
