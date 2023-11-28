import { useEffect } from 'react'

import { Input, Label, FormFeedback } from "reactstrap"
import { useNavigate } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** apis
import apiNilaiMahasiswa from '@src/composables/nilaiMahasiswa'

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

    const path = '/nilai-mahasiswa'
    let mutate
    if (props.action === 'Tambah') ({ mutate } = useMutation((data) => apiNilaiMahasiswa.postData(data), actions.submitOnSuccess(navigate, path)))
    else ({ mutate } = useMutation((data) => apiNilaiMahasiswa.putDataById(props.data.id, data), actions.submitOnSuccess(navigate, path)))

    // ** Hooks
    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(Schema) })

    useEffect(() => {
        setValue('nim', props.data.nim)
        setValue('kodeMataKuliah', props.data.kode_mata_kuliah)
        setValue('uts', props.data.uts)
        setValue('tugas', props.data.tugas)
        setValue('uas', props.data.uas)
    }, [props])

    return <FormCommon
        title={'Nilai Mahasiswa'}
        dataBreadCrumbs={[{ title: 'Nilai Mahasiswa' }]}
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
                render={({ field }) => <Input {...field} invalid={errors.nim && true} />}
            />
            {errors.nim && <FormFeedback>{errors.nim.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='kodeMataKuliah'>
                Kode Mata Kuliah
            </Label>
            <Controller
                id='kodeMataKuliah'
                name='kodeMataKuliah'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.kodeMataKuliah && true} />}
            />
            {errors.kodeMataKuliah && <FormFeedback>{errors.kodeMataKuliah.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='uts'>
                UTS
            </Label>
            <Controller
                id='uts'
                name='uts'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.uts && true} />}
            />
            {errors.uts && <FormFeedback>{errors.uts.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='tugas'>
                Tugas
            </Label>
            <Controller
                id='tugas'
                name='tugas'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.tugas && true} />}
            />
            {errors.tugas && <FormFeedback>{errors.tugas.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
            <Label className='form-label' for='uas'>
                UAS
            </Label>
            <Controller
                id='uas'
                name='uas'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.uas && true} />}
            />
            {errors.uas && <FormFeedback>{errors.uas.message}</FormFeedback>}
        </div>
    </FormCommon>
}

export default FormSubmit