import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MataKuliah extends BaseModel {
  public static connection = 'mssql'
  public static table = 'mata_kuliah'

  @column({ isPrimary: true, columnName: 'kode_mata_kuliah' })
  public kode: string

  @column({ columnName: 'nama_mata_kuliah' })
  public nama: string

  @column()
  public sks: number
}
