import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { FORM_TYPES, WHO_CON_DOES } from 'App/Const/Const'
import Form from 'App/Mongo/Form'
import Response from 'App/Mongo/Response'
export default class FormController {
	async index({ }: HttpContextContract) {
		const forms = await Form.find()
		return {
			data: forms,
			message: 'success',
			error: false,
			code: 200,
		}
	}
	async storeOrUpdate({ request, params, response }: HttpContextContract) {
		const formPayload = await request.validate({
			schema: schema.create({
				name: schema.string(),
				description: schema.string.optional(),
				whoCanAccess: schema.enum(WHO_CON_DOES),
				type: schema.enum(FORM_TYPES),
				questions: schema.array([rules.minLength(1)]).members(
					schema.object().members({
						question: schema.string(),
						isChallenge: schema.boolean.optional(),
						isScale: schema.number.optional(),
						options: schema.array.optional().members(
							schema.object().members({
								option: schema.string(),
								score: schema.number.optional()
							})
						),
					})
				),
			}),
		})
		formPayload.questions = formPayload.questions.map((question) => {
			return Object.assign({}, { isChallenge: false, isScale: 0 }, question)
		})
		const formId = params.formId
		if (formId && request.method() === 'PUT') {
			if (!formId.match(/^[0-9a-fA-F]{24}$/)) {
				return response.formatter(null, 404, 'Not Found')
			}
			const form = await Form.findById(formId).exec()
			if (!form) {
				return response.formatter(null, 404, 'Not Found')
			}
			await form?.update(formPayload as any)
			return {
				data: form,
				message: 'success',
				error: false,
				status: 200,
			}
		}
		
		
		const form = await Form.create(formPayload)
		return {
			data: form,
			message: 'success',
			error: false,
			status: 201,
		}
	}

	async show({ params }: HttpContextContract) {
		const form = await Form.findOne({ _id: params.formId })
		return {
			data: form,
			message: 'success',
			error: false,
			status: 200,
		}
	}

	async storeResponseByUser({ request, response, params }: HttpContextContract) {
		const responsePayload = await request.validate({
			schema: schema.create({
				response: schema.array([rules.minLength(1)]).members(schema.object().members({
					questionId: schema.string(),
					answer: schema.string.optional(),
					scale: schema.number.optional(),
					optionId: schema.string.optional(),
					score: schema.number.optional()
				})),
				patient: schema.object.optional().members({
					name: schema.string(),
					type: schema.string(),
					gender: schema.string(),
					age: schema.number()
				})
			})
		})
		const form = await Form.findById(params.formId)
		if(!form){
			return response.formatter(null, 404, 'Not Found')
		}
		const responseUser = Object.assign({}, responsePayload, params)
		const patientType = responsePayload?.patient?.type!
		const paramFind: any = params
		if(patientType){
			paramFind['patient.type'] = patientType
		}
		let r = await Response.findOne(paramFind)
		if(r){
			r.response = responseUser.response as any
			r.patient = responseUser.patient as any
			await r.save()
			return response.formatter(r)
		}
		const res = await Response.create(responseUser)
		response.formatter(res, 201)
	}

	async getResponseByUser({response, params}: HttpContextContract){
		const form = await Form.findById(params.formId)
		if(!form){
			return response.formatter(null, 404, 'Not Found')
		}
		const responses = await Response.findById(params.responseId)
		return response.formatter(responses || null)
	}
}
