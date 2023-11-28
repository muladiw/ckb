const url = '/mahasiswa/'
import GeneralApi from '@src/composables/GeneralApi'

class Mahasiswa extends GeneralApi {
  constructor(url) {
    super(url)
    this.url = url
  }
}

export default new Mahasiswa(url)