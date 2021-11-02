import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { responseFormatter } from 'App/utils'

export default class ResponseFormatterProvider {
	public static needsApplication = true
	constructor(protected app: ApplicationContract) {}

	public async boot() {
		const Response = this.app.container.use('Adonis/Core/Response')

		Response.macro(
			'formatter',
			function (data: any, status?: number, message?: any, error: boolean = false) {
				const res = responseFormatter(data, status, message, error)
				this.ctx?.response.status(res.status).send(res)
				return
			}
		)
	}
}
