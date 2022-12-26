import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { customerFetchPark } from '../http/parkAPI'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { Context } from '../index'
import ParkList from '../components/ParkList'
import Pages from '../components/Pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/container/container.css'
import '../styles/fonts/fonts.css'

const Main = observer(() => {
  const { park } = useContext(Context)
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    setIsLoading(true)
    customerFetchPark(park.searchQuery, park.selectedTown, park.page, 3)
      .then((data) => {
        park.setTown(data.towns)
        data = data.parks
        park.setPark(data.rows)
        park.setSearchPark(data.rows)
        park.setTotalCount(data.count)
      })
      .finally(() => setIsLoading(false))
  }, [park.searchQuery, park.selectedTown, park.page])
  return (
    <Container className="contr">
      {park.selectedTown ? (
        <div className="heading1 description">Парки развлечений в городе {park.selectedTown}</div>
      ) : (
        <div className="heading1 description">Парки развлечений России</div>
      )}

      {isLoading ? (
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', top: '50%', marginTop: '60px' }}>
          <Spinner animation={'border'} className={'text-light'} style={{ position: 'relative' }} />
        </div>
      ) : (
        <Col>
          <ParkList />
          <Col className="mx-2">
            <Pages />
          </Col>
        </Col>
      )}
    </Container>
  )
})

export default Main
