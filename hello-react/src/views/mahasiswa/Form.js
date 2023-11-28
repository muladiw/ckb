import { useEffect } from 'react'

import { Input, Label, FormFeedback } from "reactstrap"
import { useNavigate } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** apis
import apiMahasiswa from '@src/composables/mahasiswa'

import {
    useMutation
} from 'react-query'

import FormCommon from '@src/views/component/form'
import actions from '@src/views/component/actions'

const FormSubmit = (props) => {
    const navigate = useNavigate()

    // const requiredMsg = 'Tidak Boleh Kosong'
    const Schema = yup.object().shape({
        // label: yup.string().required(`Label ${requiredMsg}`)
    })

    const path = '/mahasiswa'
    let mutate
    if (props.action === 'Tambah') ({ mutate } = useMutation((data) => apiMahasiswa.postData(data), actions.submitOnSuccess(navigate, path)))
    else ({ mutate } = useMutation((data) => apiMahasiswa.putDataById(props.data.nim, data), actions.submitOnSuccess(navigate, path)))

    // ** Hooks
    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(Schema) })

    useEffect(() => {
        setValue('nim', props.data.nim)
        setValue('nama', props.data.nama)
        setValue('jurusan', props.data.jurusan)
    }, [props])

    return <FormCommon
        title={'Mahasiswa'}
        dataBreadCrumbs={[{ title: 'Mahasiswa' }]}
        action={props.action}
        isShowData={props.isShowData}
        path={path}
        handleSubmit={handleSubmit}
        mutate={mutate}
    >
        <div className='mb-1'>
            <Label className='form-label' for='nim'>
                NIM
            </Label>
            <Controller
                id='nim'
                name='nim'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} disabled={props.action === 'Ubah'} invalid={errors.nim && true} />}
            />
            {errors.nim && <FormFeedback>{errors.nim.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='nama'>
                Nama
            </Label>
            <Controller
                id='nama'
                name='nama'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.nama && true} />}
            />
            {errors.nama && <FormFeedback>{errors.nama.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='jurusan'>
                Jurusan
            </Label>
            <Controller
                id='jurusan'
                name='jurusan'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.jurusan && true} />}
            />
            {errors.jurusan && <FormFeedback>{errors.jurusan.message}</FormFeedback>}
        </div>
    </FormCommon>
}

export default FormSubmit