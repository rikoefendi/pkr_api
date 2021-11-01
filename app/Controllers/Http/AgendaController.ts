import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Agenda from 'App/Models/Agenda'

export default class AgendaController {
	public async index({ request }: HttpContextContract) {
		const schedules = await Agenda.query().where('shcedule_id', request.param('id'))
		return {
			data: schedules,
			error: false,
			message: 'success',
			status: 200
		}
	}

	public async storeOrUpdate({ request, response }: HttpContextContract) {
		const schedulePayload = await request.validate({
			schema: schema.create({
				schedule_id: schema.number.optional([
					rules.exists({ table: 'schedules', column: 'id' })
				]),
                start_date: schema.date(),
                end_date: schema.date(),
                description: schema.string({}, [rules.maxLength(500)]),
                fasilitator: schema.string({}, [rules.maxLength(100)]),
                selfTrain: schema.boolean.optional()
			})
		})
		const isUpdate = request.method() == 'PUT' && request.param('id')
		let schedule: Agenda
		if (isUpdate) {
			schedule = await Agenda.findOrFail(request.param('id'))
			schedule.merge(schedulePayload)
			await schedule.save()
		} else {
			schedule = await Agenda.create(schedulePayload)
		}
		response.status(isUpdate ? 200 : 201)
		return {
			data: schedule,
			error: false,
			message: isUpdate ? 'updated' : 'created',
			status: isUpdate ? 200 : 201
		}
	}

	public async show({ request}: HttpContextContract) {
		const schedule = await Agenda.findOrFail(request.param('id'))
		return{
			data: schedule,
			error: false,
			message: 'success',
			status: 200
		}
	}

	public async destroy({ request, response}: HttpContextContract) {
		const schedule = await Agenda.findOrFail(request.param('id'))
		await schedule.delete()
		response.status(204)
		return
	}
}
