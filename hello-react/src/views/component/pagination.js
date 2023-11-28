import ReactPaginate from 'react-paginate'

const Pagination = (props) => {
  const { count, halaman, handlePagination } = props

  return <ReactPaginate
    previousLabel={''}
    nextLabel={''}
    breakLabel='...'
    pageCount={Math.ceil(count) || 1}
    marginPagesDisplayed={2}
    pageRangeDisplayed={2}
    activeClassName='active'
    forcePage={halaman !== 0 ? halaman : 0}
    onPageChange={page => handlePagination(page)}
    pageClassName='page-item'
    breakClassName='page-item'
    nextLinkClassName='page-link'
    pageLinkClassName='page-link'
    breakLinkClassName='page-link'
    previousLinkClassName='page-link'
    nextClassName='page-item next-item'
    previousClassName='page-item prev-item'
    containerClassName={
      'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    }
  />
}

export default Pagination