import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
export default class Mailers extends BaseMailer {
	constructor(private config: any, private payload: any) {
		super()
	}
	public prepare(message: MessageContract) {
		let basePath = 'emails/'
		let config = this.config
		let payload = this.payload
		message.subject(config.subject).from(config.from, 'Ramah Remaja').to(payload.user.email)
		if (config.template) message.htmlView(basePath + config.template, payload)
	}
}
