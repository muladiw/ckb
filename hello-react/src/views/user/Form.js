import { useEffect } from 'react'

import { Input, Label, FormFeedback } from "reactstrap"
import { useNavigate } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** apis
import apiUser from '@src/composables/user'

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

    const path = '/user'
    let mutate
    if (props.action === 'Tambah') ({ mutate } = useMutation((data) => apiUser.postData(data), actions.submitOnSuccess(navigate, path)))
    else ({ mutate } = useMutation((data) => apiUser.putDataById(props.data.id, data), actions.submitOnSuccess(navigate, path)))

    // ** Hooks
    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(Schema) })

    useEffect(() => {
        setValue('nama', props.data.nama)
        setValue('alamat', props.data.alamat)
        setValue('noTelepon', props.data.no_telepon)
        setValue('jenisKelamin', props.data.jenis_kelamin || '', { shouldValidate: true })
    }, [props])

    return <FormCommon
        title={'User'}
        dataBreadCrumbs={[{ title: 'User' }]}
        action={props.action}
        isShowData={props.isShowData}
        path={path}
        handleSubmit={handleSubmit}
        mutate={mutate}
    >
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
            <Label className='form-label' for='alamat'>
                Alamat
            </Label>
            <Controller
                id='alamat'
                name='alamat'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.alamat && true} />}
            />
            {errors.alamat && <FormFeedback>{errors.alamat.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='noTelepon'>
                No Telepon
            </Label>
            <Controller
                id='noTelepon'
                name='noTelepon'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.noTelepon && true} onChange={e => {
                    const { value } = e.target
                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                        setValue('noTelepon', value)
                    }
                }} />}
            />
            {errors.noTelepon && <FormFeedback>{errors.noTelepon.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='jenisKelamin'>
                Jenis Kelamin
            </Label>
            <Controller
                id='jenisKelamin'
                name='jenisKelamin'
                defaultValue=''
                control={control}
                render={({ field }) => <Input type='select' {...field} invalid={errors.jenisKelamin && true}>
                    <option value=''>-- Pilih Salah Satu --</option>
                    <option value='Laki-laki'>Laki-laki</option>
                    <option value='Perempuan'>Perempuan</option>
                </Input>}
            />
            {errors.jenisKelamin && <FormFeedback>{errors.jenisKelamin.message}</FormFeedback>}
        </div>
    </FormCommon >
}

export default FormSubmit