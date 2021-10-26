import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Schedule from 'App/Models/Schedule'

export default class SchedulesController {
	public async index({ request }: HttpContextContract) {
		const schedules = await Schedule.query().where('subject_id', request.param('id'))
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
				counselor_id: schema.number.optional([
					rules.exists({ table: 'counselors', column: 'id' })
				]),
				subject_id: schema.number([
					rules.exists({ table: 'subjects', column: 'id' })
				]),
				description: schema.string.optional({}, [
					rules.minLength(10),
					rules.maxLength(500)
				]),
				start_date: schema.date(),
				end_date: schema.date()
			})
		})
		const isUpdate = request.method() == 'PUT' && request.param('id')
		let schedule: Schedule
		if (isUpdate) {
			schedule = await Schedule.findOrFail(request.param('id'))
			schedule.merge(schedulePayload)
			await schedule.save()
		} else {
			schedule = await Schedule.create(schedulePayload)
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
		const schedule = await Schedule.findOrFail(request.param('id'))
		return{
			data: schedule,
			error: false,
			message: 'success',
			status: 200
		}
	}

	public async destroy({ request, response}: HttpContextContract) {
		const schedule = await Schedule.findOrFail(request.param('id'))
		await schedule.delete()
		response.status(204)
		return
	}
}
