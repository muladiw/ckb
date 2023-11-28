import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Mahasiswa extends BaseModel {
  public static connection = 'mssql'
  public static table = 'mahasiswa'

  @column({ isPrimary: true })
  public nim: string

  @column({ columnName: 'nama_mahasiswa' })
  public nama: string

  @column()
  public jurusan: string
}
