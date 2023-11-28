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
import apiMataKuliah from '@src/composables/mataKuliah'

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

    const { isLoading, data, refetch } = useQuery(['mataKuliah', searchValue, start, rowsPerPage, sortColumn, orderColumn, halaman], () => apiMataKuliah.getData(), { keepPreviousData: true })

    pending = isLoading
    if (!isLoading) {
        if (data.isSuccess) {
            totalRecords = data?.data.length
            dataRows = data?.data
        }
    }

    const { mutate } = useMutation(({ id }) => apiMataKuliah.deleteDataById(id), actions.deleteOnSuccess(setStart, setHalaman, refetch))

    const columns = [
        {
            sortable: false,
            name: 'Kode Mata Kuliah',
            sortField: 'kode',
            selector: row => row.kode
        },
        {
            sortable: false,
            name: 'Nama Mata Kuliah',
            sortField: 'nama',
            selector: row => row.nama
        },
        {
            sortable: false,
            name: 'SKS',
            sortField: 'sks',
            selector: row => row.sks
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
                        <DropdownItem className='w-100' onClick={() => navigate(`ubah/${row.kode}`)}>
                            <Edit size={15} />
                            <span className='align-middle ms-50'>Edit</span>
                        </DropdownItem>
                        <DropdownItem className='w-100' onClick={() => actions.clickDelete(row.kode, mutate)}>
                            <Trash size={15} />
                            <span className='align-middle ms-50'>Hapus</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        }
    ]

    return <Table
        title={'Mata Kuliah'}
        dataBreadCrumbs={[{ title: 'Mata Kuliah' }]}
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