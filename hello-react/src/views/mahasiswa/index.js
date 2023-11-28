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
import apiMahasiswa from '@src/composables/mahasiswa'

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

    const { isLoading, data, refetch } = useQuery(['mahasiswa', searchValue, start, rowsPerPage, sortColumn, orderColumn, halaman], () => apiMahasiswa.getData(), { keepPreviousData: true })

    pending = isLoading
    if (!isLoading) {
        if (data.isSuccess) {
            totalRecords = data?.data.length
            dataRows = data?.data
        }
    }

    const { mutate } = useMutation(({ id }) => apiMahasiswa.deleteDataById(id), actions.deleteOnSuccess(setStart, setHalaman, refetch))

    const columns = [
        {
            sortable: false,
            name: 'NIM',
            sortField: 'nim',
            selector: row => row.nim
        },
        {
            sortable: false,
            name: 'Nama',
            sortField: 'nama',
            selector: row => row.nama
        },
        {
            sortable: false,
            name: 'jurusan',
            sortField: 'jurusan',
            selector: row => row.jurusan
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
                        <DropdownItem className='w-100' onClick={() => navigate(`ubah/${row.nim}`)}>
                            <Edit size={15} />
                            <span className='align-middle ms-50'>Edit</span>
                        </DropdownItem>
                        <DropdownItem className='w-100' onClick={() => actions.clickDelete(row.nim, mutate)}>
                            <Trash size={15} />
                            <span className='align-middle ms-50'>Hapus</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        }
    ]

    return <Table
        title={'Mahasiswa'}
        dataBreadCrumbs={[{ title: 'Mahasiswa' }]}
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