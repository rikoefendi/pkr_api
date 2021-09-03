import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  computed,
} from "@ioc:Adonis/Lucid/Orm";
import { FILE_TYPES } from "App/Const/Const";
export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public parentId: number;

  @column()
  public name: string;

  @column()
  public private: boolean = false;

  @column()
  public type: typeof FILE_TYPES[number];

  @column()
  public unique: string;

  @column()
  public mime: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @computed()
  public get fullPath() {
    return `${this.type.toLocaleLowerCase()}/${this.unique}.${this.mime}`;
  }
}
