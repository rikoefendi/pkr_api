import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Schedule from 'App/Models/Break/Schedule'
import CrudServices from 'App/Services/CrudServices'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class SchedulesController {
	public crudServices: CrudServices
	constructor() {
		this.crudServices = new CrudServices(Schedule)
	}
	public async index({ response }: HttpContextContract) {
		const schedules = await this.crudServices.fetch()
		return response.formatter(schedules)
	}

	public async store({ request, response }: HttpContextContract) {
		const payload = await request.validate({
			schema: schema.create({
				name: schema.string(),
				training_id: schema.number([
					rules.exists({
						table: 'trainings',
						column: 'id',
					}),
				]),
			}),
		})

		const schedule = await this.crudServices.create(payload)
		return response.formatter(schedule, 201)
	}

	public async show({ params, response }: HttpContextContract) {
		const scheduleId = params.id
		const schedule = await this.crudServices.fetch([['id', '=', scheduleId]]).firstOrFail()
		return response.formatter(schedule)
	}

	public async update({ request, params, response }: HttpContextContract) {
		const scheduleId = params.id
		const payload = await request.validate({
			schema: schema.create({
				name: schema.string.optional(),
				training_id: schema.number.optional([
					rules.exists({
						table: 'trainings',
						column: 'id',
					}),
				]),
			}),
		})
		const query = this.crudServices.fetch([['id', '=', scheduleId]])
		const schedule = await this.crudServices.update(query, payload)
		return response.formatter(schedule)
	}

	public async destroy({ response, params }: HttpContextContract) {
		await this.crudServices.destroyById(params.id)
		return response.formatter(null)
	}
}
