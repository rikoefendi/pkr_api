import {DriveConfig} from '@ioc:Adonis/Core/Drive'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
const driveConfig: DriveConfig = {
    disk: Env.get('DRIVE_DISK', 'gcs'),
    
    disks: {
        local: {
            driver: 'local',
            visibility: 'public',
            root: Application.tmpPath('uploads'),
            serveAssets: true,
            basePath: '/uploads',
          },
        gcs: {
            driver: 'gcs',
            visibility: 'private',
            keyFilename: Env.get('GCS_KEY_FILENAME'),
            bucket: Env.get('GCS_BUCKET'),
            usingUniformAcl: false
          }
  
    }
}

export default driveConfig