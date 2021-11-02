import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
// import UserServices from 'App/Services/UsersServices'
export default class AuthController {
	// private userServices = new UserServices()
	async index({ params }: HttpContextContract) {
		const users = await (
			await User.query()
				.preload('files')
				.paginate(params.page | 1, 15)
		).toJSON()
		return {
			data: users.data,
			error: false,
			code: 200,
			message: 'Success',
			meta: users.meta,
		}
	}
	async destroy({ params, response }: HttpContextContract) {
		const user = await User.findOrFail(params.id)
		await user.delete()
		response.status(204)
	}
}
