'use strict'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { MongooseConfig } from '@ioc:Mongoose'
import {Mongoose } from 'mongoose'
export default class MongoProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    this.app.container.singleton('Mongoose', () => {
      const config = this.app.container.resolveBinding('Adonis/Core/Config').get('mongoose', {}) as MongooseConfig
      const mongoose = new Mongoose(config.options)
      let url = config.url
      if(!config.url){
        mongoose.connect(`mongodb://${config.host}:${config.port}/?readPreference=primary&ssl=false`, {
        dbName: config.dbName,
        pass: config.pass,
        user: config.user,
      })
      }else{
        mongoose.connect(url)
      }
      return mongoose
    })

  }

  public async shutdown () {
    // Cleanup, since app is going down
    await this.app.container.use('Mongoose').disconnect()
  }
}
