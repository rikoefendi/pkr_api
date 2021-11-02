import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subject from 'App/Models/Break/Subject'
import CrudServices from 'App/Services/CrudServices'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class SubjectsController {
	public crudServices: CrudServices
	constructor() {
		this.crudServices = new CrudServices(Subject)
	}
	public async index({ response }: HttpContextContract) {
		const subjects = await this.crudServices.fetch()
		return response.formatter(subjects)
	}

	public async store({ request, response }: HttpContextContract) {
		const payload = await request.validate({
			schema: schema.create({
				name: schema.string(),
				description: schema.string.optional(),
				type: schema.string(),
				schedule_id: schema.number([
					rules.exists({
						table: 'schedules',
						column: 'id',
					}),
				]),
			}),
		})

		const subject = await this.crudServices.create(payload)
		return response.formatter(subject, 201)
	}

	public async show({ params, response }: HttpContextContract) {
		const subjectId = params.id
		const subject = await this.crudServices.fetch([['id', subjectId]]).firstOrFail()
		return response.formatter(subject)
	}

	public async update({ request, params, response }: HttpContextContract) {
		const subjectId = params.id
		const payload = await request.validate({
			schema: schema.create({
				name: schema.string.optional(),
				description: schema.string.optional(),
				type: schema.string.optional(),
				schedule_id: schema.number.optional([
					rules.exists({
						table: 'schedules',
						column: 'id',
					}),
				]),
			}),
		})
		const query = this.crudServices.fetch([['id', subjectId]])
		const subject = await this.crudServices.update(query, payload)
		return response.formatter(subject)
	}

	public async destroy({ params, response }: HttpContextContract) {
		await this.crudServices.destroyById(params.id)
		return response.formatter(null)
	}
}
