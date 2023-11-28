import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  public static connection = 'mssql'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string

  @column()
  public alamat: string

  @column({ columnName: 'no_telepon' })
  public noTelepon: string

  @column()
  public jenisKelamin: string

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime
}
