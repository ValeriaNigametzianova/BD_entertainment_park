import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'
import '../styles/Items/parkItem/parkItem.css'
const Pages = observer(() => {
  const { park } = useContext(Context)
  const pageCount = Math.ceil(park.totalCount / park.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }
  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          className="page-item.active .page-link "
          key={page}
          active={park.page === page}
          onClick={() => park.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  )
})

export default Pages
