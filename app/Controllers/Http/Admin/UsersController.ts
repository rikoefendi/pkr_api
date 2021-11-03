import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { USER_STATUS_ACTIVATED } from 'App/Const/Const'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
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

	async accept({params, response}: HttpContextContract){
		const user = await User.findOrFail(params.id)
		user.status = USER_STATUS_ACTIVATED
		const date = DateTime.now()
		const month = String(date.get('month'))
		const fistUniqid = `${date.get('year')}${month.length > 1? month: 0+month}`
		let uniqid:any = ''
		const lastUnique = await User.query().where('uniqid', 'like', `${fistUniqid}%`).select('uniqid').orderBy('uniqid', 'desc').first()
		if(!lastUnique){
			uniqid = fistUniqid+'0001'
		}else{
			uniqid = Number(lastUnique?.uniqid)+1
		}
		user.uniqid = uniqid
		await user.save()
		return response.formatter(user)
	}
}
