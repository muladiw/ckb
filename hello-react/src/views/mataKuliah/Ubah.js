import { useParams } from 'react-router-dom'

import {
    useQuery
} from 'react-query'

// ** apis
import apiMataKuliah from '@src/composables/mataKuliah'

import FormSubmit from './Form'

const Ubah = () => {
    const params = useParams()

    let dataDetail = {}
    let isShowData = false

    const { isLoading, data } = useQuery(['mataKuliahDetail', params.id], () => apiMataKuliah.getDataById(params.id), { staleTime: 600000 })
    isShowData = !isLoading
    if (!isLoading) {
        if (data.isSuccess) dataDetail = data.data
    }

    return <FormSubmit action="Ubah" data={dataDetail} isShowData={isShowData} />
}

export default Ubah