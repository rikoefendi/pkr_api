import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
    constructor(protected ctx: HttpContextContract) {

    }

    public schema = schema.create({
        name: schema.string({ trim: true }, [
            rules.maxLength(100)
        ]),
        email: schema.string({ trim: true }, [
            rules.unique({ table: 'users', column: 'email' }),
            rules.email(),
        ]),
        password: schema.string({ trim: true }, [
            rules.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
        ])
    })
    public messages = {
        'name.required': 'Nama harus diisi',
        'name.maxLength': 'Nama maksimal teridiri dari 100 karakter',
        'email.unique': 'Email Sudah di gunakan',
        'email.email': 'Email harus alamat surel yang valid',
        'email.required': 'Email harus diisi',
        'password.required': 'Password harus diisi',
        'password.regex': 'Password minimal 8 karakter dengan campuran huruf besar kecil, angka',
    }
}
