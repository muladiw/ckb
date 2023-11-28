const url = '/nilai-mahasiswa/'
import GeneralApi from '@src/composables/GeneralApi'

class NilaiMahasiswa extends GeneralApi {
  constructor(url) {
    super(url)
    this.url = url
  }
}

export default new NilaiMahasiswa(url)