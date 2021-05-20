
import { BaseModel,  column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Stock from 'App/Models/Stock';

export default class Outlet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public outlet_code: string;

  @column()
  public name: string;

  @column()
  public location: string;

  // Relationship
  @hasMany(() => Stock)
  public forum: HasMany<typeof Stock>;
}
