import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { customerFetchPark } from '../http/parkAPI'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '../index'
import ParkList from '../components/ParkList'
import Pages from '../components/Pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/container/container.css'
import '../styles/fonts/fonts.css'

const Main = observer(() => {
  const { park } = useContext(Context)

  useEffect(() => {
    customerFetchPark(park.searchQuery, park.selectedTown, park.page, 3).then(
      (data) => {
        park.setTown(data.towns)
        data = data.parks
        park.setPark(data.rows)
        park.setSearchPark(data.rows)
        park.setTotalCount(data.count)
      }
    )
  }, [park.searchQuery, park.selectedTown, park.page])

  return (
    <Container className="contr">
      {park.selectedTown ? (
        <Row className="heading1 description">
          Парки развлечений в городе {park.selectedTown}
        </Row>
      ) : (
        <Row className="heading1 description">Парки развлечений России</Row>
      )}
      <ParkList />
      <Col className="mx-2">
        {/* <Row> */}
        <Pages />
        {/* </Row> */}
      </Col>
    </Container>
  )
})

export default Main
