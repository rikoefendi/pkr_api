import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Training from 'App/Models/Break/Training'
import CrudServices from 'App/Services/CrudServices'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class TrainingsController {
	public crudServices: CrudServices
	constructor() {
		this.crudServices = new CrudServices(Training)
	}
	public async index({ response }: HttpContextContract) {
		const trainings = await this.crudServices.fetch()
		return response.formatter(trainings)
	}

	public async store({ request, response }: HttpContextContract) {
		const payload = await request.validate({
			schema: schema.create({
				name: schema.string(),
				description: schema.string.optional(),
				quota: schema.number(),
				status: schema.number.optional(),
			}),
		})

		const training = await this.crudServices.create(payload)
		return response.formatter(training, 201)
	}

	public async show({ params, response }: HttpContextContract) {
		const trainingId = params.id
		const training = await this.crudServices
			.fetchByOrId([['slug', '=', params.id]], trainingId)
			.firstOrFail()
		return response.formatter(training)
	}

	public async update({ request, params, response }: HttpContextContract) {
		const trainingId = params.id
		const payload = await request.validate({
			schema: schema.create({
				name: schema.string.optional(),
				description: schema.string.optional(),
				quota: schema.number.optional(),
				status: schema.number.optional(),
			}),
		})
		const query = this.crudServices.fetchByOrId([['slug', '=', params.id]], trainingId)
		const training = await this.crudServices.update(query, payload)
		return response.formatter(training)
	}

	public async destroy({ params, response }: HttpContextContract) {
		await this.crudServices.destroyById(params.id)
		return response.formatter(null)
	}
}
