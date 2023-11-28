const url = '/users/'
import GeneralApi from '@src/composables/GeneralApi'

class User extends GeneralApi {
    constructor(url) {
        super(url)
        this.url = url
    }
}

export default new User(url)