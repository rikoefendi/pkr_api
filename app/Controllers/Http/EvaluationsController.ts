import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Evaluation from 'App/Models/Evaluation'
export default class EvaluationsController {
	async storeOrUpdate({ request }: HttpContextContract) {
		const evaluationId = request.param('id')
		const isEdit: Boolean = request.method() === 'PUT' && evaluationId

		const { name, description } = await request.validate({
			schema: schema.create({
				name: schema.string.optional(
					{},
					!isEdit ? [rules.minLength(10), rules.maxLength(225)] : [rules.maxLength(225)]
				),
				description: schema.string.optional({}, [rules.maxLength(500)]),
			}),
		})

		let evaluation: Evaluation
		if (isEdit) {
			evaluation = await Evaluation.findOrFail(evaluationId)
			evaluation.merge({ name, description })
			await evaluation.save()
		} else {
			evaluation = await Evaluation.create({ name, description })
		}

		return { data: evaluation, status: 200, message: 'Success', error: false }
	}
	public async show({ request }: HttpContextContract) {
		const data = await Evaluation.query()
			.preload('questions', (question) => {
				question.preload('answer').preload('choices')
			})
			.where('id', request.param('id'))
			.firstOrFail()
		return {
			data,
			error: false,
			message: 'success',
			status: 200,
		}
	}

	public async destroy({ request, response }: HttpContextContract) {
		const evaluation = await Evaluation.findOrFail(request.param('id'))
		await evaluation.delete()
		response.status(204)
		return
	}

	public async answersQuestions({ request }: HttpContextContract) {
		await request.validate({
			schema: schema.create({
				answers: schema.array().members(
					schema.object().members({
						question_id: schema.number(),
						answer_id: schema.number(),
					})
				),
			}),
		})
	}
}
