import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class NilaiMahasiswa extends BaseModel {
  public static connection = 'mssql'
  public static table = 'nilai_mahasiswa'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'nim' })
  public nim: string

  @column({ columnName: 'kode_mata_kuliah' })
  public kodeMataKuliah: string

  @column()
  public uts: number

  @column()
  public tugas: number

  @column()
  public uas: number

  @column({ columnName: 'nilai_akhir' })
  public nilaiAkhir: string
}
