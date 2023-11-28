const url = '/mata-kuliah/'
import GeneralApi from '@src/composables/GeneralApi'

class MataKuliah extends GeneralApi {
  constructor(url) {
    super(url)
    this.url = url
  }
}

export default new MataKuliah(url)