import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import helper from '@src/libs/helper'

export default {
  clickDelete: (id, mutate) => {
    MySwal.fire({
      title: 'Anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-primary ms-1'
      },
      buttonsStyling: false
    }).then(async result => {
      if (result.value)
        mutate({ id })
    })
  },
  handlePagination: (page, setHalaman, setStart, rowsPerPage) => {
    setHalaman(page.selected)
    setStart(page.selected * rowsPerPage)
  },
  handleSort: async (column, sortDirection, setSortColumn, setOrderColumn) => {
    setSortColumn(column.sortField)
    setOrderColumn(sortDirection == 'asc' ? 1 : -1)
  },
  handlePerPage: (e, setRowsPerPage, setStart) => {
    setRowsPerPage(e.target.value)
    setStart(0)
  },
  deleteOnSuccess: (setStart, setHalaman, refetch) => ({
    onSuccess: async (res) => {
      if (res.isSuccess) {
        setStart(0)
        setHalaman(0)
        refetch()
        MySwal.fire({
          icon: 'success',
          title: 'Dihapus!',
          text: 'Data Anda Telah Dihapus.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    }
  }),
  submitOnSuccess: (navigate, path) => ({
    onSuccess: async (res) => {
      if (res.isSuccess) {
        helper.showToast('success', `Berhasil`, 'Data Berhasil Disimpan')

        navigate(path)
      }
    }
  })
} 