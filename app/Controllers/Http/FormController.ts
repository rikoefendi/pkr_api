import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Form from 'App/Mongo/Form'
export default class FormController {
	async index({}: HttpContextContract) {
		const forms = await Form.find()
		return {
			data: forms,
			message: 'success',
			error: false,
			code: 200,
		}
	}
	async storeOrUpdate({ request }: HttpContextContract) {
		const formPayload = await request.validate({
			schema: schema.create({
				name: schema.string(),
				description: schema.string.optional(),
				questions: schema.array().members(
					schema.object().members({
						question: schema.string(),
						isChallenge: schema.boolean.optional(),
						isScore: schema.number.optional(),
						options: schema.array.optional().members(
							schema.object().members({
								option: schema.string(),
							})
						),
					})
				),
			}),
		})
		formPayload.questions = formPayload.questions.map((question) => {
			return Object.assign({}, { isChallenge: false, isScore: 0 }, question)
		})
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
}
