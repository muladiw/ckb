import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from "reactstrap"
import { Edit, Trash, MoreVertical } from 'react-feather'

import {
    useQuery,
    useMutation
} from 'react-query'

// ** apis
import apiNilaiMahasiswa from '@src/composables/nilaiMahasiswa'

import Table from '@src/views/component/table'
import actions from '@src/views/component/actions'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Index = () => {
    const navigate = useNavigate()

    // ** States
    const [start, setStart] = useState(0)
    const [halaman, setHalaman] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [sortColumn, setSortColumn] = useState('')
    const [rowsPerPage] = useState('')
    const [orderColumn, setOrderColumn] = useState('')
    let pending = false
    let totalRecords = 0
    let dataRows = []

    const { isLoading, data, refetch } = useQuery(['nilaiMahasiswa', searchValue, start, rowsPerPage, sortColumn, orderColumn, halaman], () => apiNilaiMahasiswa.getData(), { keepPreviousData: true })

    pending = isLoading
    if (!isLoading) {
        if (data.isSuccess) {
            totalRecords = data?.data.length
            dataRows = data?.data
        }
    }

    const { mutate } = useMutation(({ id }) => apiNilaiMahasiswa.deleteDataById(id), actions.deleteOnSuccess(setStart, setHalaman, refetch))

    const columns = [
        {
            sortable: false,
            name: 'NIM',
            sortField: 'nim',
            selector: row => row.nim
        },
        {
            sortable: false,
            name: 'Nama Mata Kuliah',
            sortField: 'kode',
            selector: row => row.nama_mata_kuliah
        },
        {
            sortable: false,
            name: 'uts',
            sortField: 'uts',
            selector: row => row.uts
        },
        {
            sortable: false,
            name: 'uts kalkulasi',
            sortField: 'uts',
            selector: row => row.utsKal
        },
        {
            sortable: false,
            name: 'Tugas',
            sortField: 'tugas',
            selector: row => row.tugas
        },
        {
            sortable: false,
            name: 'Tugas Kalkulasi',
            sortField: 'tugas',
            selector: row => row.tugasKal
        },
        {
            sortable: false,
            name: 'uas',
            sortField: 'uas',
            selector: row => row.uas
        },
        {
            sortable: false,
            name: 'UAS kalkulasi',
            sortField: 'tugas',
            selector: row => row.uasKal
        },
        {
            sortable: false,
            name: 'nilai akhir',
            sortField: 'uas',
            selector: row => row.nilai_akhir
        },
        {
            name: 'Aksi',
            maxWidth: '70px',
            cell: row => <div className='d-flex'>
                <UncontrolledDropdown>
                    <DropdownToggle className='pe-1' tag='span'>
                        <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu end container="body">
                        <DropdownItem className='w-100' onClick={() => navigate(`ubah/${row.id}`)}>
                            <Edit size={15} />
                            <span className='align-middle ms-50'>Edit</span>
                        </DropdownItem>
                        <DropdownItem className='w-100' onClick={() => actions.clickDelete(row.id, mutate)}>
                            <Trash size={15} />
                            <span className='align-middle ms-50'>Hapus</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        }
    ]

    return <Table
        title={'Nilai Mahasiswa'}
        dataBreadCrumbs={[{ title: 'Nilai Mahasiswa' }]}
        // rowsPerPage={rowsPerPage}
        // setRowsPerPage={setRowsPerPage}
        columns={columns}
        dataRows={dataRows}
        pending={pending}
        totalRecords={totalRecords}
        halaman={halaman}
        setHalaman={setHalaman}
        setStart={setStart}
        setSearchValue={setSearchValue}
        setSortColumn={setSortColumn}
        setOrderColumn={setOrderColumn}
    />
}

export default Index