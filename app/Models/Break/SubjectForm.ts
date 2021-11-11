import { DateTime } from 'luxon'
import { BaseModel, column, afterFetch, computed } from '@ioc:Adonis/Lucid/Orm'
import Form from 'App/Mongo/Form'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import Response from 'App/Mongo/Response'

export default class SubjectForm extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public subjectId: number

	@column()
	public formId: string

	@column()
	public label?: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@afterFetch()
	public static async findForm(subjects: SubjectForm[]) {
		const ctx = HttpContext.get()!
		const userId = ctx?.auth.user?.id! as any
		await Promise.all(subjects.map(async subject => {
			const form = await Form.findById(subject.formId)
			subject.questions = form?.questions
			const response = await Response.find({formId: subject.formId as any, userId, subjectId: subject.subjectId as any }).count()
			subject.status = response ? true: false
			subject.type = form?.type
			subject.whoCanAccess = form?.whoCanAccess
			if (!subject.label) {
				subject.label = form?.name as any
			}
			return subject
		}))
	}
	@computed()
	public questions?: Array<any>
	@computed()
	public type?: StringConstructor
	@computed()
	public whoCanAccess?: StringConstructor
	@computed()
	public status: boolean
}
