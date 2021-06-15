/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'
Event.on('user:register', 'UserListener.register')
Event.on('user:login', 'UserListener.login')
Event.on('user:email:change', 'UserListener.emailUpdate')
Event.on('user:email:verified', 'UserListener.emailVerified')
Event.on('user:password:forgot', 'UserListener.forgotPassword')
Event.on('user:password:resetted', 'UserListener.resetPassword')
Event.on('db:query', Database.prettyPrint)