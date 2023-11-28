/* eslint-disable @typescript-eslint/space-before-function-paren */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MataKuliah from 'App/Models/MataKuliah'

export default class MataKuliahController {
  public async index() {
    return {
      data: await MataKuliah.all(),
    }
  }

  public async postMataKuliah({ request, response }: HttpContextContract) {
    const { kode, nama, sks } = request.body()

    try {
      await this.verifyUniqueMataKuliah(kode)

      const mataKuliah = new MataKuliah()

      mataKuliah.kode = kode
      mataKuliah.nama = nama
      mataKuliah.sks = sks
      await mataKuliah.save()
      return {
        pesan: 'Create data success',
      }
    } catch (error) {
      response.status(401)
      return {
        pesan: 'Your Name Is Already Used',
      }
    }
  }

  public async getMataKuliahById({ request }: HttpContextContract) {
    const { id } = request.params()

    return {
      data: await MataKuliah.find(id),
    }
  }

  public async putMataKuliahById({ request }: HttpContextContract) {
    const { id } = request.params()

    await MataKuliah
      .query()
      .where('kode_mata_kuliah', id)
      .update(request.body())
    return {
      pesan: 'Update data success',
    }
  }

  public async deleteMataKuliahById({ request }: HttpContextContract) {
    const { id } = request.params()

    await MataKuliah.query().where('kode_mata_kuliah', id).delete()
    return {
      pesan: 'Delete data success',
    }
  }

  public async verifyUniqueMataKuliah(kode) {
    const result = await MataKuliah.findBy('kode_mata_kuliah', kode)
    if (result) {
      throw new Error('Kode already exists')
    }
  }
}
