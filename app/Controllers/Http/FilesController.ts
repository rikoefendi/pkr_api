import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import * as Helpers from "@ioc:Adonis/Core/Helpers";
import {
  FILE_TYPES,
  FILE_TYPE_IDENTITY,
  FILE_TYPE_MEMBER,
} from "App/Const/Const";
import File from "App/Models/File";
import { CannotWriteFileException } from "@adonisjs/drive/build/standalone";
import Drive from "@ioc:Adonis/Core/Drive";
import Logger from "@ioc:Adonis/Core/Logger";
export default class FilesController {
  async fetch({ request }: HttpContextContract) {
    const type: string = request.param("type").toUpperCase();
    const uniq = request.param("uniqid");
    const file = await File.query()
      .where("type", type)
      .where("unique", uniq)
      .firstOrFail();
    const url = await Drive.getSignedUrl(file.fullPath);
    return { data: { ...file.toJSON(), url }, error: false, status: 200 };
  }
  async upload({ request }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        name: schema.string({}, [rules.maxLength(255)]),
        type: schema.enum(FILE_TYPES),
        file: schema.file({
          size: "100mb",
          extnames: ["mp3", "aa", "aac", "pdf", "jpg", "png", "jpeg"],
        }),
      }),
    });
    const trx = await Database.transaction();
    const unique = Helpers.string.generateRandom(20);
    const ext = data.file?.extname;
    const path = data.type.toLocaleLowerCase();
    const fileName = `${unique}.${ext}`;
    const fullPath = path + "/" + fileName;
    try {
      const file = new File();
      if ([FILE_TYPE_IDENTITY, FILE_TYPE_MEMBER].includes(data.type)) {
        file.private = true;
      }
      file.name = data.name;
      file.unique = unique;
      file.type = data.type;
      file.mime = ext!;

      await data.file?.moveToDisk(path, {
        visibility: !file.private ? "public" : "private",
        name: fileName,
      });
      await file.useTransaction(trx).save();

      await trx.commit();
      const url = await Drive.getSignedUrl(fullPath);
      return { data: { ...file.toJSON(), url }, error: false, status: 201 };
    } catch (error) {
      await trx.rollback();
      if (!(error instanceof CannotWriteFileException)) {
        await Drive.delete(fullPath);
      }
      Logger.error(error);
      return { data: null, error: error.message, status: error.code || 500 };
    }
  }
  async destroy({ request, response }: HttpContextContract) {
    const type = request.param("type").toUpperCase();
    const uniq = request.param("uniqid");
    const trx = await Database.transaction();
    try {
      const file = await File.query()
        .where("type", type)
        .where("unique", uniq)
        .useTransaction(trx)
        .firstOrFail();
      await Drive.delete(file.fullPath);
      await file.delete();
      await trx.commit();
      response.status(204);
      return;
    } catch (error) {
      await trx.rollback();
      return { error: error.message, data: null, status: error.status || 500 };
    }
  }
}
