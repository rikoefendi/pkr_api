import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
	return { hello: 'world' }
})

Route.group(() => {
	// Route.group(() => {
	//     Route.get('/', 'TrainingController.index')
	//     Route.post('/', 'TrainingController.storeOrUpdate')
	//     Route.get('/:id', 'TrainingController.show')
	//     Route.put('/:id', 'TrainingController.storeOrUpdate')
	//     Route.delete('/:id', 'TrainingController.destroy')
	// }).prefix('trainings')
	// Route.group(() => {
	//     Route.post('/', 'SchedulesController.storeOrUpdate')
	//     Route.get('/:id', 'SchedulesController.show')
	//     Route.put('/:id', 'SchedulesController.storeOrUpdate')
	//     Route.delete('/:id', 'SchedulesController.destroy')
	// }).prefix('schedules')
	// Route.group(() => {
	//     Route.post('/', 'AgendaController.storeOrUpdate')
	//     Route.get('/:id', 'AgendaController.show')
	//     Route.put('/:id', 'AgendaController.storeOrUpdate')
	//     Route.delete('/:id', 'AgendaController.destroy')
	// }).prefix('agendas')
	// Route.group(() => {
	//     Route.get('/:id/schedules', 'SchedulesController.index')
	//     Route.post('/', 'SubjectsController.storeOrUpdate')
	//     Route.get('/:id', 'SubjectsController.show')
	//     Route.put('/:id', 'SubjectsController.storeOrUpdate')
	//     Route.delete('/:id', 'SubjectsController.destroy')
	//     Route.post('/:id/form', 'SubjectsController.assignForm')
	//     Route.get('/:id/form/:formId', 'SubjectsController.getForm')
	//     Route.post('/:id/user', 'SubjectsController.assignUser').middleware('auth')
	//     Route.get('/:id/user', 'SubjectsController.getAssignUser').middleware('auth')
	// }).prefix('subjects')
	// Route.group(() => {
	//     Route.get('/', 'CounselorsController.index')
	//     Route.post('/', 'CounselorsController.storeOrUpdate')
	//     Route.get('/:id', 'CounselorsController.show')
	//     Route.put('/:id', 'CounselorsController.storeOrUpdate')
	//     Route.delete('/:id', 'CounselorsController.destroy')
	// }).prefix('counselors')
	// Route.group(() => {
	//     Route.post('/', 'ComponentsController.storeOrUpdate')
	//     Route.put('/:id', 'ComponentsController.storeOrUpdate')
	//     Route.post('/subjected', 'ComponentsController.subjectedComponents')
	// }).prefix('components')
	// Route.group(() => {
	//     Route.get('/:id', 'EvaluationsController.show')
	//     Route.post('/', 'EvaluationsController.storeOrUpdate')
	//     Route.put('/:id', 'EvaluationsController.storeOrUpdate')
	//     Route.delete('/:id', 'EvaluationsController.destroy')
	//     Route.post('/:id/answers/:subjectComponentId', 'EvaluationsController.answersEvaluation')
	// }).prefix('evaluations')
	// Route.group(() => {
	//     Route.get('/:id', 'QuestionsController.show')
	//     Route.post('/', 'QuestionsController.storeOrUpdate')
	//     Route.put('/:id', 'QuestionsController.storeOrUpdate')
	//     Route.delete('/:id', 'QuestionsController.destroy')
	// }).prefix('questions')
	// Route.group(() => {
	//     Route.get('/:id', 'AnswersController.show')
	//     Route.post('/', 'AnswersController.storeOrUpdate')
	//     Route.put('/:id', 'AnswersController.storeOrUpdate')
	//     Route.delete('/:id', 'AnswersController.destroy')
	// }).prefix('answers')
}).prefix('v1')

Route.group(() => {
	Route.group(() => {
		Route.post('register', 'Users/AuthController.register')
		Route.post('login', 'Users/AuthController.login')
		Route.delete('logout', 'Users/AuthController.logout').middleware(['auth'])
		Route.get('profile', 'Users/ProfilesController.show').middleware(['auth'])
		Route.put('profile', 'Users/ProfilesController.update').middleware(['auth', 'verified'])
		Route.put('status', 'Users/ProfilesController.status').middleware(['auth', 'verified'])
		Route.group(() => {
			Route.post('update', 'Users/EmailsController.update').middleware(['auth'])
			Route.get('verify', 'Users/EmailsController.verify').as('verifyEmail')
			Route.post('verify/resend', 'Users/EmailsController.resend').as('resendVerifyEmail')
		}).prefix('email')
		Route.group(() => {
			Route.post('update', 'Users/PasswordsController.update')
			Route.post('forgot', 'Users/PasswordsController.forgot')
			Route.post('reset', 'Users/PasswordsController.reset').as('resetPassword')
		}).prefix('password')
		Route.group(() => {
			Route.get('/', 'Admin/UsersController.index')
			Route.post('/', 'Admin/UsersController.create')
			Route.get('/:id', 'Admin/UsersController.show')
			Route.put('/:id', 'Admin/UsersController.update')
			Route.put('/:id/verify', 'Admin/UsersController.verify')
			Route.delete('/:id', 'Admin/UsersController.destroy')
		}) //.middleware('isAdmin')
	}).prefix('users')
	Route.group(() => {
		Route.get('suggest', 'AddressController.suggest')
	}).prefix('address')
	Route.group(() => {
		Route.get('/', 'FormController.index')
		Route.post('/', 'FormController.storeOrUpdate')
		Route.put('/:formId', 'FormController.storeOrUpdate')
		Route.get('/:formId', 'FormController.show')
		Route.delete('/:formId', 'FormController.destroy')
	}).prefix('forms')
	Route.group(() => {
		Route.post('upload', 'FilesController.upload')
		Route.get('/:type/:uniqid', 'FilesController.fetch')
		Route.delete('/:type/:uniqid', 'FilesController.destroy')
		Route.get('/:userId/:slug/user', 'FilesController.getAudioConselingUser')
	}).prefix('files')
	Route.resource('/trainings', 'Break/TrainingsController').apiOnly()
	Route.group(() => {
		Route.get('/:userId/joins', 'Break/TrainingsController.userJoinTrainings').middleware(
			'auth'
		)
		Route.post(
			'/:trainingId/:userId/join',
			'Break/TrainingsController.userJoinTraining'
		).middleware('auth')
		Route.put(
			'/:trainingId/:userId/join/:joinId/status',
			'Break/TrainingsController.userJoinTrainingStatus'
		).middleware('auth')
	}).prefix('trainings')
	Route.resource('/schedules', 'Break/SchedulesController').apiOnly()
	Route.resource('/agenda', 'Break/AgendaController').apiOnly()
	// Route.group(() => {
	// }).prefix('/trainings').as('trainings')
	// Route.group(() => {
	// }).prefix('/schedules').as('schedules')
	// Route.group(() => {
	// }).prefix('/agenda').as('agenda')
	Route.resource('/subjects', 'Break/SubjectsController')
	Route.group(() => {
		Route.get('/:subjectId/forms', 'Break/SubjectsController.getFormBySubjectId').as(
			'getFormBySubjectId'
		)
	})
		.prefix('subjects')
		.as('subjects')
	Route.post('upload-audio', 'Break/UploadAudiosController.store').middleware('auth')
	Route.get('upload-audio/:subjectId', 'Break/UploadAudiosController.show').middleware('auth')
}).prefix('break-change')
