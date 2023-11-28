import helper from '@src/libs/helper'
import http from '@src/libs/axios'
// import auth from '@src/composables/auth'
const auth = {}

export default class GeneralApi {
  constructor(url) {
    this._url = url
    this._auth = auth
  }

  async getData(params) {
    return http({
      url: this._url,
      params
      // headers: { Authorization: `Bearer ${result.data.accessToken}` }
    })
      .then(res => ({
        isSuccess: true,
        ...res.data
      }))
      .catch(err => {
        helper.showError(err, `Error Get Data`)

        return { isSuccess: false }
      })
  }

  async postData(data) {
    return http({
      url: this._url,
      data,
      method: 'post'
    })
      .then(() => ({
        isSuccess: true
      }))
      .catch(err => {
        helper.showError(err, `Error Submit Data`)

        return { isSuccess: false }
      })
  }

  async putDataById(id, data) {
    return http({
      url: this._url + id,
      data,
      method: 'put'
    })
      .then(() => ({
        isSuccess: true
      }))
      .catch(err => {
        helper.showError(err, `Error Submit Data`)

        return { isSuccess: false }
      })
  }

  async getDataById(id) {
    return http({
      url: `${this._url}detail/${id}`
    })
      .then(res => ({
        isSuccess: true,
        ...res.data
      }))
      .catch(err => {
        helper.showError(err, `Error Get Data`)

        return { isSuccess: false }
      })
  }

  async deleteDataById(id) {
    return http({
      url: this._url + id,
      method: 'delete'
    })
      .then(() => ({
        isSuccess: true
      }))
      .catch(err => {
        helper.showError(err, `Error Delete Data`)

        return { isSuccess: false }
      })
  }

  async getOpsi(id = '', params = {}) {
    const result = await this._auth.refreshToken()
    return http({
      url: `${this.url}get-opsi/${id}`,
      params,
      headers: { Authorization: `Bearer ${result.data.accessToken}` }
    })
      .then(res => ({
        isSuccess: true,
        data: res.data
      }))
      .catch(err => {
        helper.showError(err, `Error Get Data`)

        return { isSuccess: false }
      })
  }
}