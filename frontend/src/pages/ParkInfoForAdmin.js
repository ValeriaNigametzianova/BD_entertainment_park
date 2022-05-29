import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import ParkList from '../components/ParkList'
import { stuffFetchPark } from '../http/parkAPI'

const ParkInfoForAdmin = () => {
  const { park } = useContext(Context)
  const { user } = useContext(Context)

  useEffect(() => {
    stuffFetchPark(user.id).then((data) => {
      park.setPark(data.rows)
    })
  }, [])

  // useEffect(() => {
  //         customerFetchPark(park.selectedTown, park.page, 3).then(data => {
  //             park.setPark(data.rows)
  //             park.setTotalCount(data.count)
  //         })
  // }, [park.page, park.selectedTown])

  return (
    <Container>
      <Row className="mt-9">
        <Col>
          <ParkList />
        </Col>
      </Row>
    </Container>
  )
}

export default ParkInfoForAdmin
