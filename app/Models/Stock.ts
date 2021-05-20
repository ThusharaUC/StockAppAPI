import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, } from '@ioc:Adonis/Lucid/Orm'
import Item from 'App/Models/Item';
import Outlet from './Outlet';
import User from './User';

export default class Stock extends BaseModel {

  // item() {
    // return this.('./Item');
  // }

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;
  
  @column()
  public userId: string;

  @column()
  public avalStock: number;
  
  @column()
  public sysStock: number;

  @column()
  public item_id: number;

  @column()
  public itemId: number;
  
  @column()
  public outlet_id: number;
  
  @column()
  public outletId: number;
  
  //Relationship
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  //Relationship
  @belongsTo(() => Item)
  public item: BelongsTo<typeof Item>;

  //Relationship
  @belongsTo(() => Outlet)
  public outlet: BelongsTo<typeof Outlet>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
