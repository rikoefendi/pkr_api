import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Agenda from 'App/Models/Break/Agenda'
import CrudServices from 'App/Services/CrudServices'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class AgendaController {
	public crudServices: CrudServices<typeof Agenda>
	constructor() {
		this.crudServices = new CrudServices(Agenda)
	}
	public async index({ response, request }: HttpContextContract) {
		const scheduleId = request.qs().schedule_id
		let agenda: Agenda[]
		if (scheduleId) {
			agenda = await this.crudServices.fetch([['schedule_id', scheduleId]])
		} else {
			agenda = await this.crudServices.fetch()
		}
		return response.formatter(agenda)
	}

	public async store({ request, response }: HttpContextContract) {
		const payload = await request.validate({
			schema: schema.create({
				schedule_id: schema.number([
					rules.exists({
						table: 'schedules',
						column: 'id',
					}),
				]),
				start_date: schema.date(),
				end_date: schema.date(),
				description: schema.string.optional(),
				fasilitator: schema.string.optional(),
			}),
		})

		const agenda = await this.crudServices.create(payload)
		return response.formatter(agenda, 201)
	}

	public async show({ params, response }: HttpContextContract) {
		const agendaId = params.id
		const agenda = await this.crudServices.fetch([['id', '=', agendaId]]).firstOrFail()
		return response.formatter(agenda)
	}

	public async update({ request, params, response }: HttpContextContract) {
		const agendaId = params.id
		const payload = await request.validate({
			schema: schema.create({
				schedule_id: schema.number.optional([
					rules.exists({
						table: 'schedules',
						column: 'id',
					}),
				]),
				start_date: schema.date.optional(),
				end_date: schema.date.optional(),
				description: schema.string.optional(),
				fasilitator: schema.string.optional(),
			}),
		})
		const query = this.crudServices.fetch([['id', '=', agendaId]])
		const agenda = await this.crudServices.update(query, payload)
		return response.formatter(agenda)
	}

	public async destroy({ response, params }: HttpContextContract) {
		await this.crudServices.destroyById(params.id)
		return response.formatter(null)
	}
}
