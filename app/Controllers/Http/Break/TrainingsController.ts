import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Training from 'App/Models/Break/Training'
import CrudServices from 'App/Services/CrudServices'
import { schema } from '@ioc:Adonis/Core/Validator'
import UserTraining from 'App/Models/Break/UserTraining'
import Database from '@ioc:Adonis/Lucid/Database'
import map from 'lodash/map'
export default class TrainingsController {
	public crudServices: CrudServices<typeof Training>
	constructor() {
		this.crudServices = new CrudServices(Training)
	}
	public async index({ response, request }: HttpContextContract) {
		const training = await this.crudServices.fetch().preload('schedules').paginate(request.qs().page)
		let data = training.all().map(train => train.toJSON())
		const agendaIds: Array<number> = []
		data.map(train => train.schedules.map(agenda => agendaIds.push(agenda.id)))
		const agenda = await Database.query().from('agenda').select('schedule_id').min('start_date', 'start_date').max('end_date', 'end_date').whereIn('schedule_id', agendaIds).groupBy('schedule_id')
		data = data.map(train => {
			const date = agenda.filter(date => map(train.schedules, 'id').includes(date.schedule_id))[0]
			delete date.schedule_id
			return Object.assign({}, train, date)
		})
		return response.formatter(data).setMeta(training.getMeta())
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
		let training = this.crudServices.fetchByOrId([['slug', '=', params.id]], trainingId).preload('schedules')
		return response.formatter(await training.firstOrFail())
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
	async userJoinTraining({ params, response, auth }: HttpContextContract) {
		await auth.authenticate()
		const training: any = await this.crudServices.findById(params.trainingId)
		const userTrainingServices = new CrudServices(UserTraining)
		const userTraining = await userTrainingServices.create({
			userId: params.userId,
			trainingId: training.id,
			status: 0,
			message: null,
		})
		return response.formatter(userTraining, 200, 'Berhasil bergabung pelatihan')
	}

	async userJoinTrainingStatus({ request, response, params, auth }: HttpContextContract) {
		const { status, message } = await request.validate({
			schema: schema.create({
				status: schema.number(),
				message: schema.string.optional(),
			}),
		})
		await auth.authenticate()
		const userTrainingServices = new CrudServices(UserTraining)
		const query = userTrainingServices.fetchByOrId([
			['id', params.joinId],
			['user_id', params.userId],
			['schedule_id', params.trainingId],
		])
		const userTraining = await userTrainingServices.update(query, {
			status,
			message,
		})
		return response.formatter(userTraining, 200)
	}
	async userJoinTrainings({ params, response }: HttpContextContract) {
		const userTrainingServices = new CrudServices(UserTraining)
		const userTraining = await userTrainingServices.fetchByOrId([['user_id', params.userId]])
		return response.formatter(userTraining)
	}
}
