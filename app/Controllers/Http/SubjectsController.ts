import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { FILE_TYPE_MODULE } from 'App/Const/Const'
import Subject from 'App/Models/Subject'
import UserSubject from 'App/Models/UserSubject'
import Form from 'App/Mongo/Form'

export default class SubjectsController {
	public async index({ request }: HttpContextContract) {
		const subjects = await Subject.query().where('training_id', request.param('id'))
		return {
			data: subjects,
			error: false,
			message: 'success',
			status: 200,
		}
	}

	public async storeOrUpdate({ request, response }: HttpContextContract) {
		const subjectPayload = await request.validate({
			schema: schema.create({
				name: schema.string({}, [
					rules.required(),
					rules.minLength(5),
					rules.maxLength(255),
				]),
				description: schema.string.optional({}, [
					rules.minLength(10),
					rules.maxLength(500),
				]),
				type: schema.string(),
			}),
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
			status: isUpdate ? 200 : 201,
		}
	}

	public async show({ request }: HttpContextContract) {
		const subject = await Subject.query()
			.preload('file', (query) => {
				query.where('type', FILE_TYPE_MODULE)
			})
			.where('id', request.param('id'))
			.firstOrFail()
		return {
			data: subject,
			error: false,
			message: 'success',
			status: 200,
		}
	}

	public async destroy({ request, response }: HttpContextContract) {
		const subject = await Subject.findOrFail(request.param('id'))
		await subject.delete()
		response.status(204)
		return
	}

	async assignForm({ request, response }: HttpContextContract) {
		const assignPayload = await request.validate({
			schema: schema.create({
				formId: schema.string(),
				label: schema.string.optional(),
			}),
		})
		try {
			await Form.exists({ _id: assignPayload.formId })
		} catch (error) {
			response.status(422)
			return {
				error: true,
				message: 'formId not found ' + error.message,
				code: 422,
			}
		}

		// const subjectForm = new SubjectForm()
		// subjectForm.formId = assignPayload.formId
		// subjectForm.label = assignPayload.label
		// subjectForm.subjectId = params.id
		// await subjectForm.save()
		// return {
		// 	data: subjectForm,
		// }
	}

	// async getForm({ params }: HttpContextContract) {
		// const subjectForm = await (await SubjectForm.findOrFail(params.id)).toJSON()
		// const form: any = await Form.findOne({ _id: params.formId })
		// subjectForm.formId = form._id
		// subjectForm.label = subjectForm.label || form.name
		// subjectForm.questions = form.questions
		// return {
		// 	data: subjectForm,
		// }
	// }

	async assignUser({ request, params, auth }: HttpContextContract) {
		await auth.authenticate()
		const assignUser = await request.validate({
			schema: schema.create({
				fileId: schema.number.optional(),
				score: schema.string.optional(),
			}),
		})
		const userSubject = new UserSubject()
		userSubject.userId = auth.user?.id!
		userSubject.subjectId = params.id
		userSubject.fileId = assignUser.fileId
		userSubject.score = assignUser.score
		await userSubject.save()
		return {
			data: userSubject,
		}
	}

	async getAssignUser({ request, params }: HttpContextContract) {
		const fileType: any = request.qs() || 'CONSELING'
		const userSubject = await UserSubject.query()
			.preload('file', (query) => {
				query.where('type', fileType)
			})
			.where('subject_id', params.id)
			.firstOrFail()
		return {
			data: userSubject,
		}
	}
}
