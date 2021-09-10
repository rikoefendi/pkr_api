import Env from "@ioc:Adonis/Core/Env";
import {MongooseConfig}from "@ioc:Mongoose";

const mongooseConfig: MongooseConfig = {
    options: {
        debug: true,
        autoCreate: true,
        autoIndex: false
    },
    dbName: Env.get('MONGO_DB_NAME', ''),
    user: Env.get('MONGO_USER', ''),
    pass: Env.get('MONGO_PASS', ''),
    host: Env.get('MONGO_HOST', 'localhost'),
    port: Env.get('MONGO_PORT', 27017)
}
export default mongooseConfig