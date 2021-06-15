import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(() => {
    Route.group(() => {
        Route.post('register', 'Users/AuthController.register')
        Route.post('login', 'Users/AuthController.login')
        Route.delete('logout', 'Users/AuthController.logout').middleware(['auth'])
        Route.get('profile', 'Users/AuthController.profile').middleware(['auth'])
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
            Route.get('/', 'UsersController.index')
            Route.post('/', 'UsersController.create')
            Route.get('/:unque', 'UsersController.show')
            Route.put('/:unique', 'UsersController.update')
            Route.delete('/:unique', 'UsersContrller.destroy')
        })//.middleware('isAdmin')
    }).prefix('users')
}).prefix('v1')