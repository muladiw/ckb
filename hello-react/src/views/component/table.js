import { useState, useEffect } from 'react'

import Breadcrumbs from '@components/breadcrumbs'
import {
  Card, CardHeader, CardBody, CardTitle, Row, Col, Label, Input, Button,
} from "reactstrap"
import { ChevronDown, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import Pagination from '@src/views/component/pagination'
import { Link } from 'react-router-dom'

import actions from '@src/views/component/actions'

const Table = ({
  children,
  title,
  dataBreadCrumbs,
  rowsPerPage,
  setRowsPerPage,
  columns,
  dataRows,
  pending,
  totalRecords,
  halaman,
  setHalaman,
  setStart,
  setSearchValue,
  setSortColumn,
  setOrderColumn,
  expandableRows,
  expandOnRowClicked,
  expandableRowsComponent,
  onRowExpandToggled,
  customStyles
}) => {
  const [tempSearchValue, setTempSearchValue] = useState('')

  const pagination = () => {
    const count = Math.ceil(totalRecords / rowsPerPage)

    return <Pagination count={count} halaman={halaman} handlePagination={(page) => actions.handlePagination(page, setHalaman, setStart, rowsPerPage)} />
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      setStart(0)
      setSearchValue(tempSearchValue)
    }, 500)
    return () => clearTimeout(getData)
  }, [tempSearchValue])

  return <>
    <Breadcrumbs title={title} data={dataBreadCrumbs} />
    <Card>
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardTitle>
          <Button size='sm' color='primary' tag={Link} to={`tambah`}>
            <Plus size={14} /> Tambah
          </Button>
        </CardTitle>
      </CardHeader>
      <CardBody>
        {children}
        <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={e => actions.handlePerPage(e, setRowsPerPage, setStart)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={100}>1000</option>
              </Input>
              <Label for='sort-select'>entries</Label>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
            <Label className='me-1' for='search-input'>
              Cari
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={tempSearchValue}
              onChange={e => setTempSearchValue(e.target.value)}
            />
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            paginationServer
            className='react-dataTable'
            columns={columns}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={pagination}
            data={dataRows}
            sortServer
            onSort={(column, sortDirection) => actions.handleSort(column, sortDirection, setSortColumn, setOrderColumn)}
            progressPending={pending}
            expandableRows={expandableRows}
            expandOnRowClicked={expandOnRowClicked}
            expandableRowsComponent={expandableRowsComponent}
            onRowExpandToggled={onRowExpandToggled}
            customStyles={customStyles}
          />
        </div>
      </CardBody>
    </Card>
  </>
}

export default Table 
