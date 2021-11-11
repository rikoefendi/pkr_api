'use strict'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { MongooseConfig } from '@ioc:Mongoose'
import { Mongoose } from 'mongoose'
export default class MongoProvider {
	constructor(protected app: ApplicationContract) { }

	public register() {
		this.app.container.singleton('Mongoose', () => {
			const config = this.app.container
				.resolveBinding('Adonis/Core/Config')
				.get('mongoose', {}) as MongooseConfig
			return this.connect(config)
		})
	}

	public async shutdown() {
		
		// Cleanup, since app is going down
		await this.app.container.use('Mongoose').connection.close()
		console.log('shutdown');
	}

	private connect(config) {
		const Logger = this.app.container.use('Adonis/Core/Logger');

		const mongoose = new Mongoose(config.options)
		let url = config.url
		try {
			if (!url) {
				mongoose.connect(
					`mongodb://${config.host}:${config.port}/?readPreference=primary&ssl=false`,
					{
						dbName: config.dbName,
						pass: config.pass,
						user: config.user,
					}
				)
			} else {
				mongoose.connect(url)
			}
			return mongoose
		} catch (e) {
			Logger.error('%s (%s)', e.message, url);
		}
	}
}
