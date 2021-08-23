import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { GENDERS } from "App/Const/Const";

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.string({}, [rules.mobile({ locales: ["id-ID"] })]),
	birthday: schema.date({
		format: 'dd-MM-yyyy'
	}),
	gender: schema.enum(GENDERS),
	profesi: schema.string({}, [
		rules.alpha(),
		rules.minLength(5),
		rules.maxLength(50),
	]),
	last_education: schema.string({}, [
		rules.alpha(),
		rules.minLength(5),
		rules.maxLength(50),
	]),
  });

  public messages = {};
}
