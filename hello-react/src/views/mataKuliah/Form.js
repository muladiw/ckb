import { useEffect } from 'react'

import { Input, Label, FormFeedback } from "reactstrap"
import { useNavigate } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** apis
import apiMataKuliah from '@src/composables/mataKuliah'

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

    const path = '/mata-kuliah'
    let mutate
    if (props.action === 'Tambah') ({ mutate } = useMutation((data) => apiMataKuliah.postData(data), actions.submitOnSuccess(navigate, path)))
    else ({ mutate } = useMutation((data) => apiMataKuliah.putDataById(props.data.kode, data), actions.submitOnSuccess(navigate, path)))

    // ** Hooks
    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(Schema) })

    useEffect(() => {
        setValue('kode', props.data.kode)
        setValue('nama', props.data.nama)
        setValue('sks', props.data.sks)
    }, [props])

    return <FormCommon
        title={'Mata Kuliah'}
        dataBreadCrumbs={[{ title: 'Mata Kuliah' }]}
        action={props.action}
        isShowData={props.isShowData}
        path={path}
        handleSubmit={handleSubmit}
        mutate={mutate}
    >
        <div className='mb-1'>
            <Label className='form-label' for='kode'>
                Kode Mata Kuliah
            </Label>
            <Controller
                id='kode'
                name='kode'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} disabled={props.action === 'Ubah'} invalid={errors.kode && true} />}
            />
            {errors.kode && <FormFeedback>{errors.kode.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='nama'>
                Nama Mata Kuliah
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
            <Label className='form-label' for='sks'>
                SKS
            </Label>
            <Controller
                id='sks'
                name='sks'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.sks && true} />}
            />
            {errors.sks && <FormFeedback>{errors.sks.message}</FormFeedback>}
        </div>
    </FormCommon>
}

export default FormSubmit