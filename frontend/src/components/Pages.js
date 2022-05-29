import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import {Context} from '../index'

const Pages = observer(()=>{
    const {park} = useContext(Context)
    const pageCount = Math.floor(park.totalCount / park.limit)
    const pages=[]

    for (let i=1; i< pageCount; i++){
        pages.push(i)
    }
    return(
        <Pagination className='mt-5'>
            {pages.map(page =>
                <Pagination.Item 
                key={page}
                active={park.page === page}
                onClick={() => park.setPage(page)}
                >
                {page}
                </Pagination.Item>)}
        </Pagination>
    )
})

export default Pages;