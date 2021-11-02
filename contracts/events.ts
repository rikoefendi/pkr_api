import User from 'App/Models/User'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { TokenContract } from 'App/Services/TokenServices'
declare module '@ioc:Adonis/Core/Event' {
	interface EventsList {
		'user:register': TokenContract<User>
		'user:login': { request: RequestContract; user: User }
		'user:email:change': TokenContract<User>
		'user:email:verified': User
		'user:password:updated': User
		'user:password:forgot': TokenContract<User>
		'user:password:resetted': User
	}
}
