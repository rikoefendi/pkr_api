import Drive from "@ioc:Adonis/Core/Drive";
import Env from "@ioc:Adonis/Core/Env";
import File from "App/Models/File";
import driveConfig from "Config/drive";

export default class FileServices {
  async get(parent, types) {
    const isLocalDrive = driveConfig.disk === "local";
    const baseUrl = Env.get("BASE_URL");
    let files: any = await File.query()
      .select("unique", "type", "mime", "private")
      .where("parent_id", parent)
      .whereIn("type", types);
    files = await Promise.all(
      files.map(async (file) => {
        file = file.toJSON();
        const url = file.private
          ? await Drive.getSignedUrl(file.fullPath)
          : await Drive.getUrl(file.fullPath);
        file.url = isLocalDrive ? `${baseUrl}${url}` : url;
        return file;
      })
    );
    let file = {};
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const type = f.type;
      delete f.type;
      delete f.unique;
      delete f.mime;
      delete f.private;
      file[type.toLocaleLowerCase()] = f;
    }
    return file;
  }
}
