import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { GENDERS } from "App/Const/Const";

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.string({}, [rules.mobile({ locales: ["id-ID"] })]),
	birthday: schema.date.optional(),
	gender: schema.enum.optional(GENDERS),
	jobs: schema.string.optional({}, [
		rules.maxLength(50),
	]),
	job_duration: schema.string.optional({}, [
		rules.maxLength(100)
	]),
	home_town: schema.string({}, [
		rules.maxLength(100),
	]),
	str_number: schema.string.optional({}, [
		rules.maxLength(50),
	]),
  });

  public messages = {};
}
