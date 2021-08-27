import Drive from "@ioc:Adonis/Core/Drive";
import File from "App/Models/File";

export default class FileServices {
  async get(parent, types) {
    let files: any = await File.query()
      .select("unique", "type", "mime", "private")
      .where("parent_id", parent)
      .whereIn("type", types);
    files = await Promise.all(
      files.map(async (file) => {
          file = file.toJSON()
        file.url = file.private
          ? await Drive.getSignedUrl(file.fullPath)
          : await Drive.getUrl(file.fullPath);
        return file;
      })
    );
    let file = {}
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const type = f.type
        delete f.type
        delete f.unique
        delete f.mime
        delete f.private
        file[type.toLocaleLowerCase()] = f
    }
    return file;
  }
}
