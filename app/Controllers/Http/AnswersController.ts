import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Answer from 'App/Models/Answer'

export default class AnswersController {
	async storeOrUpdate({ request }: HttpContextContract) {
		const questionId = request.param('id')
		const isEdit: Boolean = request.method() === 'PUT' && questionId
		const question = await request.validate({
			schema: schema.create({
				is_choice: schema.boolean.optional(),
				answer: schema.string({}, [rules.maxLength(255)]),
				score: schema.number(),
				question_id: schema.number([
					rules.exists({
						table: 'questions',
						column: 'id',
					}),
				]),
			}),
		})
		let data: Answer
		if (isEdit) {
			data = await Answer.findOrFail(questionId)
			data.merge(question)
			await data.save()
		} else {
			data = await Answer.create(question)
		}
		return {
			data,
			status: 200,
			message: 'Success',
			error: false,
		}
	}

	public async show({ request }: HttpContextContract) {
		const data = await Answer.query().where('id', request.param('id')).firstOrFail()
		return {
			data,
			error: false,
			message: 'success',
			status: 200,
		}
	}

	public async destroy({ request, response }: HttpContextContract) {
		const question = await Answer.findOrFail(request.param('id'))
		await question.delete()
		response.status(204)
		return
	}
}
