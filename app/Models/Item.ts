
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Stock from 'App/Models/Stock';
export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public item_code: string;

  @column()
  public name: string;

  @column()
  public brand: string;

  // Relationship
  @hasMany(() => Stock)
  public forum: HasMany<typeof Stock>;
  
}
// function use(arg0: string) {
//   throw new Error('Function not implemented.');
// }

