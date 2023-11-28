/* eslint-disable @typescript-eslint/space-before-function-paren */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NilaiMahasiswa from 'App/Models/NilaiMahasiswa'
import Database from '@ioc:Adonis/Lucid/Database'
import MataKuliah from 'App/Models/MataKuliah'

export default class NilaiMahasiswasController {
  public async index() {
    const result = await Database.connection('mssql')
      .rawQuery(`SELECT nilai_mahasiswa.*, mata_kuliah.nama_mata_kuliah from nilai_mahasiswa 
      LEFT JOIN mata_kuliah ON nilai_mahasiswa.kode_mata_kuliah = mata_kuliah.kode_mata_kuliah`)
    return {
      data: result.map((item) => {
        return {
          ...item,
          utsKal: item.uts * 0.3,
          tugasKal: item.tugas * 0.3,
          uasKal: item.uas * 0.4,
        }
      }),
    }
  }

  public async postNilaiMahasiswa({ request, response }: HttpContextContract) {
    const { nim, kodeMataKuliah, uts, tugas, uas } = request.body()

    const trx = await Database
      .connection('mssql')
      .transaction()

    try {
      await this.verifyUniqueData('', nim, kodeMataKuliah)

      const nilaiAngka = (0.3 * uts) + (0.3 * tugas) + (0.4 * uas)
      let nilaiAkhir
      if (nilaiAngka >= 85 && nilaiAngka <= 100) {
        nilaiAkhir = 'A'
      } else if (nilaiAngka >= 75 && nilaiAngka < 85) {
        nilaiAkhir = 'B'
      } else if (nilaiAngka >= 60 && nilaiAngka < 75) {
        nilaiAkhir = 'C'
      } else if (nilaiAngka >= 40 && nilaiAngka < 60) {
        nilaiAkhir = 'D'
      } else {
        nilaiAkhir = 'E'
      }

      const nilaiMahasiswa: any = await Database
        .table('nilai_mahasiswa')
        .useTransaction(trx) // 👈
        .insert({
          kode_mata_kuliah: kodeMataKuliah,
          nim,
          uts,
          tugas,
          uas,
          nilai_akhir: nilaiAkhir,
        })

      if (nilaiMahasiswa === 0) {
        await trx.rollback()
        throw new Error('Create nilai mahasiswa failed')
      }

      // const mahasiswaData: any = await Database
      //   .from('mahasiswa')
      //   .useTransaction(trx) // 👈
      //   .where('nim', nim)
      //   .update({
      //     nilai_akhir: nilaiAkhir,
      //   })

      // if (mahasiswaData === 0) {
      //   await trx.rollback()
      //   throw new Error('Update mahasiswa failed')
      // }

      await trx.commit()
      return {
        pesan: 'Create data success',
      }
    } catch (error) {
      response.status(401)
      return {
        pesan: error.message,
      }
    }
  }

  public async getNilaiMahasiswaById({ request }: HttpContextContract) {
    const { id } = request.params()

    return {
      data: await NilaiMahasiswa.find(id),
    }
  }

  public async putNilaiMahasiswaById({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const { kodeMataKuliah, nim, uts, tugas, uas } = request.body()

    const trx = await Database
      .connection('mssql')
      .transaction()

    try {
      await this.verifyUniqueData(id, nim, kodeMataKuliah)

      const nilaiAngka = (0.3 * uts) + (0.3 * tugas) + (0.4 * uas)
      let nilaiAkhir
      if (nilaiAngka >= 85 && nilaiAngka <= 100) {
        nilaiAkhir = 'A'
      } else if (nilaiAngka >= 75 && nilaiAngka < 85) {
        nilaiAkhir = 'B'
      } else if (nilaiAngka >= 60 && nilaiAngka < 75) {
        nilaiAkhir = 'C'
      } else if (nilaiAngka >= 40 && nilaiAngka < 60) {
        nilaiAkhir = 'D'
      } else {
        nilaiAkhir = 'E'
      }

      const nilaiMahasiswa: any = await Database
        .from('nilai_mahasiswa')
        .useTransaction(trx) // 👈
        .where('id', id)
        .update({
          kode_mata_kuliah: kodeMataKuliah,
          nim,
          uts,
          tugas,
          uas,
          nilai_akhir: nilaiAkhir,
        })

      if (nilaiMahasiswa === 0) {
        await trx.rollback()
        throw new Error('Update nilai mahasiswa failed')
      }

      // const mahasiswa: any = await Database
      //   .from('mahasiswa')
      //   .useTransaction(trx) // 👈
      //   .where('nim', nim)
      //   .update({
      //     nilai_akhir: nilaiAkhir,
      //   })

      // if (mahasiswa === 0) {
      //   await trx.rollback()
      //   throw new Error('Update mahasiswa failed')
      // }

      await trx.commit()

      return {
        pesan: 'Update data success',
      }
    } catch (error) {
      response.status(401)
      return {
        pesan: error.message,
      }
    }
  }

  public async deleteNilaiMahasiswaById({ request }: HttpContextContract) {
    const { id } = request.params()

    await NilaiMahasiswa.query().where('id', id).delete()
    return {
      pesan: 'Delete data success',
    }
  }

  public async verifyUniqueData(id, nim, kode) {
    const resultMataKuliah = await MataKuliah.findBy('kode_mata_kuliah', kode)
    if (!resultMataKuliah) {
      throw new Error('Kode mata kuliah doesnt exist')
    }

    const result = await Database.connection('mssql')
      .rawQuery('select * from nilai_mahasiswa where nim = ? AND kode_mata_kuliah = ? AND id != ?', [nim, kode, id])

    if (result.length >= 1) {
      throw new Error('Your data already used')
    }
  }
}
