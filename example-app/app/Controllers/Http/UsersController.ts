/* eslint-disable @typescript-eslint/space-before-function-paren */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import nodemailer from 'nodemailer'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async index() {
    return {
      data: await User.all(),
    }
  }

  public async postUser({ request, response }: HttpContextContract) {
    const { noTelepon, nama, alamat, jenisKelamin } = request.body()

    try {
      await this.verifyUniqueUser(nama)

      const user = new User()

      user.noTelepon = noTelepon
      user.nama = nama
      user.alamat = alamat
      user.jenisKelamin = jenisKelamin
      await user.save()

      let message = '<p>Create data success</p>'
      await this.sendEmail(message)

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

  public async getUserById({ request }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.find(id)
    return {
      data: user,
    }
  }

  public async putUserById({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      await this.verifyUniqueUser(request.body().nama, id)
      await User
        .query()
        .where('id', id)
        .update(request.body())

      let message = '<p>Update data success</p>'
      await this.sendEmail(message)
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

  public async deleteUserById({ request }: HttpContextContract) {
    const { id } = request.params()

    await User.query().where('id', id).delete()
    let message = '<p>Delete data success</p>'
    await this.sendEmail(message)
    return {
      pesan: 'Delete data success',
    }
  }

  public async verifyUniqueUser(nama, id = '') {
    const result = await Database.connection('mssql')
      .rawQuery('select * from users where nama = ? AND id != ?', [nama, id])

    if (result.length > 0) {
      throw new Error('User already exists')
    }
  }

  public async sendEmail(message) {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      // secure: true,
      auth: {
        user: 'dabbce0dab0468',
        pass: '0554047017d14e',
      },
    })

    await transporter.sendMail({
      from: 'User',
      to: 'muladiw01@gmail.com',
      subject: 'User Notification',
      text: message,
    })
  }
}
