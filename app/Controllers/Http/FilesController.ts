import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import GDrive from '@ioc:Adonis/GDrive'
import Env from '@ioc:Adonis/Core/Env'
import Drive from '@ioc:Adonis/Core/Drive'
import { TsGooleDrive } from 'ts-google-drive'
import fs from 'fs'
export default class FilesController {
    async upload({ request }: HttpContextContract) {
        await request.validate({
            schema: schema.create({
                file: schema.file({ size: '100mb', extnames: ['mp3', 'aa', 'aac', 'pdf'] })
            })
        })
        return Drive.put('aaa', fs.readFileSync(__dirname + '/FilesController.ts'))
        
        // return client.createFolder({
        //     name: 'testing',
        //     parent: "root"
        // })
    }
}
