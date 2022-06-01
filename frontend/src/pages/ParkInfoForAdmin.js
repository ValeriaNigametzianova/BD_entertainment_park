import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import ParkList from '../components/ParkList'
import { stuffFetchPark } from '../http/parkAPI'

const ParkInfoForAdmin = () => {
  const { park } = useContext(Context)
  const { user } = useContext(Context)

  useEffect(() => {
    stuffFetchPark().then((data) => {
      park.setPark(data.rows)
    })
  }, [])

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
