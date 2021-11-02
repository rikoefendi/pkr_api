import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VerifiedEmailException from 'App/Exceptions/VerifiedEmailException'

export default class Verified {
	public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
		await auth.authenticate()
		if (!auth.user?.emailVerifiedAt)
			throw new VerifiedEmailException('Must Email Not Verified', 403, 'E_EMAIL_NOT_VERIFIED')
		await next()
	}
}
