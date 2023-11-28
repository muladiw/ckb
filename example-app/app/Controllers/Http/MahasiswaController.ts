/* eslint-disable @typescript-eslint/space-before-function-paren */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mahasiswa from 'App/Models/Mahasiswa'

export default class MahasiswaController {
  public async index() {
    return {
      data: await Mahasiswa.all(),
    }
  }

  public async postMahasiswa({ request, response }: HttpContextContract) {
    const { nim, nama, jurusan } = request.body()

    try {
      await this.verifyUniqueMahasiswa(nim)

      const mahasiswa = new Mahasiswa()

      mahasiswa.nim = nim
      mahasiswa.nama = nama
      mahasiswa.jurusan = jurusan
      await mahasiswa.save()
      return {
        pesan: 'Create data success',
      }
    } catch (error) {
      response.status(401)
      return {
        pesan: 'Your NIM Is Already Used',
      }
    }
  }

  public async getMahasiswaById({ request }: HttpContextContract) {
    const { id } = request.params()

    return {
      data: await Mahasiswa.find(id),
    }
  }

  public async putMahasiswaById({ request }: HttpContextContract) {
    const { id } = request.params()

    await Mahasiswa
      .query()
      .where('nim', id)
      .update(request.body())
    return {
      pesan: 'Update data success',
    }
  }

  public async deleteMahasiswaById({ request }: HttpContextContract) {
    const { id } = request.params()

    await Mahasiswa.query().where('nim', id).delete()
    return {
      pesan: 'Delete data success',
    }
  }

  public async verifyUniqueMahasiswa(nim) {
    const result = await Mahasiswa.findBy('nim', nim)
    if (result) {
      throw new Error('NIM already used')
    }
  }
}
