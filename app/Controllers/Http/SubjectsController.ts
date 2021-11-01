import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Subject from 'App/Models/Subject';

export default class SubjectsController {
	public async index({ request }: HttpContextContract) {
		const subjects = await Subject.query().where('training_id', request.param('id'))
		return {
			data: subjects,
			error: false,
			message: 'success',
			status: 200
		}
	}

	public async storeOrUpdate({ request, response }: HttpContextContract) {
		const subjectPayload = await request.validate({
			schema: schema.create({
				training_id: schema.number([
					rules.exists({ table: 'trainings', column: 'id' })
				]),
				name: schema.string({}, [
					rules.required(),
					rules.minLength(5),
					rules.maxLength(255)
				]),
				description: schema.string.optional({}, [
					rules.minLength(10),
					rules.maxLength(500)
				]),
			})
		})
		const isUpdate = request.method() == 'PUT' && request.param('id')
		let subject: Subject
		if (isUpdate) {
			subject = await Subject.findOrFail(request.param('id'))
			subject.merge(subjectPayload)
			await subject.save()
		} else {
			subject = await Subject.create(subjectPayload)
		}
		response.status(isUpdate ? 200 : 201)
		return {
			data: subject,
			error: false,
			message: isUpdate ? 'updated' : 'created',
			status: isUpdate ? 200 : 201
		}
	}

	public async show({ request}: HttpContextContract) {
		const subject = await Subject.query()//.preload('schedules', schedules => {
			//schedules.orderBy('created_at', 'asc').preload('counselor')
		//})//.preload('components')
		.where('id', request.param('id')).firstOrFail()
		
		const subjectJSON = subject.toJSON()
		subjectJSON.components = subjectJSON.components.map(component => {
			const meta = component.meta
			if(meta.pivot_label){
				component.label = meta.pivot_label
			}
			component.description = meta.pivot_description
			delete component.meta
			return component
		})
		return{
			data: subjectJSON,
			error: false,
			message: 'success',
			status: 200
		}
	}

	public async destroy({ request, response}: HttpContextContract) {
		const subject = await Subject.findOrFail(request.param('id'))
		await subject.delete()
		response.status(204)
		return
	}
}
