import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { customerFetchPark } from '../http/parkAPI'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Context } from '../index'
// import ParkMain from './Park_main';
import { useNavigate, useLocation } from 'react-router-dom'
import ParkList from '../components/ParkList'
import Pages from '../components/Pages'

const Main = observer(() => {
  const { park } = useContext(Context)
  console.log(park.searchPark)
  useEffect(() => {
    customerFetchPark(null, null, 1, 3).then((data) => {
      park.setPark(data.rows)
      park.setTotalCount(data.count)
    })
    customerFetchPark(null, null, 1, 99999).then((data) => {
      // park.setPark(data.rows)
      park.setTown([...new Set(data.rows.map((el) => el.town))])
      park.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    // if (park.selectedTown ) {
    customerFetchPark(park.searchPark, park.selectedTown, park.page, 3).then(
      (data) => {
        park.setPark(data.rows)
        park.setTotalCount(data.count)
      }
    )
    // }
  }, [park.searchPark, park.page, park.selectedTown])

  useEffect(() => {
    park.setSearchPark(park.parks)
  }, [])

  return (
    <Container>
      <Row className="mt-9">
        <Col>
          <ParkList />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
})

export default Main
