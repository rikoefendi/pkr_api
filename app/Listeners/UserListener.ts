import { RequestContract } from '@ioc:Adonis/Core/Request';
import { EventsList } from '@ioc:Adonis/Core/Event'
import Route from '@ioc:Adonis/Core/Route'
import Mailers from 'App/Mailers/Mailers';
import { DateTime } from 'luxon';
import Env from '@ioc:Adonis/Core/Env';
const mailers = {
    'user:register': {
        from: 'info@pkr.com',
        subject: 'Verifikasi Email',
        template: 'verify',
    },
    'user:email:verified': {
        from: 'info@pkr.com',
        subject: 'Email Berhasil di verifikasi',
        template: 'verified'
    },
    'user:email:change': {
        from: 'info@pkr.com',
        subject: 'Perubahan Email',
        template: 'change_email'
    },
    'user:login': {
        from: 'info@pkr.com',
        subject: 'Login Perangkat Baru',
        template: 'user_login'
    },
    'user:password:forgot': {
        from: 'reset@pkr.com',
        subject: 'Lupa Kata Sandi',
        template: 'forgot_password'
    },
    'user:password:resetted': {
        from: 'reset@pkr.com',
        subject: 'Lupa Kata Sandi',
        template: 'reset_password'
    }
}
export default class UserListener {
    private baseUrl = Env.get('BASE_URL')
    register(token: EventsList['user:register']) {
        let url = this.baseUrl + Route.makeUrl('verifyEmail', {
            qs: {
                token: token.token
            }, doamin: this.baseUrl
        })
        
        new Mailers(mailers['user:register'], {
            url, token, user: token.user
        }).send()
    }
    login({request, user}: EventsList['user:login']) {
        this.makeMail('user:login', {
            accessIp: request.ip(), user: user, accessTime: DateTime.now().toFormat('dd LLL yyyy', { locale: "id" })
        })
    }
    emailUpdate(token: EventsList['user:email:change']) {
        const { user } = token
        let url = this.baseUrl + Route.makeUrl('verifyEmail', {
            qs: {
                token: token.token
            }, domain: this.baseUrl
        })

        this.makeMail('user:email:change', {url, user})
        
    }

    emailVerified(user: EventsList['user:email:verified']) {
        this.makeMail('user:email:verified', {user})
    }

    forgotPassword(token: EventsList['user:password:forgot']) {
        const { user } = token
        let url = this.baseUrl + Route.makeUrl('resetPassword', {
            qs: {
                token: token.token
            }
        })

        this.makeMail('user:password:forgot', {url, user})

    }
    resetPassword(user: EventsList['user:password:resetted']) {
        this.makeMail('user:password:resetted', {user})
    }

    private makeMail<K extends keyof typeof mailers>(config: K, payload){
        new Mailers(mailers[config], payload).send()
    }
}
