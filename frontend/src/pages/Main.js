import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { customerFetchPark } from '../http/parkAPI'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Context } from '../index'
import ParkList from '../components/ParkList'
import Pages from '../components/Pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/cont/contr.css'
import '../styles/fonts/heading1.css'

const Main = observer(() => {
  const { park } = useContext(Context)
  const { user } = useContext(Context)
  console.log('sP', park.searchPark)
  console.log('park.parks', park.parks)

  // useEffect(() => {
  //   customerFetchPark(null, null, 1, 2).then((data) => {
  //     park.setTown(data.towns)
  //     data = data.parks
  //     park.setPark(data.rows)
  //     park.setSearchPark(data.rows)
  //     console.log('data.count', data.rows)
  //     park.setTotalCount(data.count)
  //   })
  // }, [])

  useEffect(() => {
    console.log('parksearchQuery', park.searchQuery)
    console.log('park.towns', park.towns)
    customerFetchPark(park.searchQuery, park.selectedTown, park.page, 3).then(
      (data) => {
        park.setTown(data.towns)
        data = data.parks
        park.setPark(data.rows)
        park.setSearchPark(data.rows)
        console.log('data.count', data.rows)
        park.setTotalCount(data.count)
      }
    )
  }, [park.searchQuery, park.selectedTown, park.page])

  // useEffect(() => {
  //   // if (park.selectedTown || !park.selectedTown) {
  //   console.log('lol', park.selectedTown)
  //   customerFetchPark(park.searchQuery, park.selectedTown, park.page, 3).then(
  //     (data) => {
  //       park.setPark(data.rows)
  //       park.setSearchPark(data.rows)
  //       park.setTotalCount(data.count)
  //     }
  //   )
  // }

  // useEffect(() => {
  //   // if (park.searchPark) {
  //   console.log('setSearchPark', park.parks)
  //   // return () => {
  //   park.setSearchPark(park.parks)
  //   // }
  //   // }
  // }, [])

  return (
    <Container className="contr">
      <Row>
        <Container>
          {park.selectedTown ? (
            <Row className="heading1">
              Парки развлечений в городе {park.selectedTown}
            </Row>
          ) : (
            <Row className="heading1">Парки развлечений России</Row>
          )}
          <Row className="mt-9">
            <Col>
              <ParkList />
            </Col>
          </Row>
        </Container>
      </Row>
      <Row>
        <Pages />
      </Row>
    </Container>
  )
})

export default Main
