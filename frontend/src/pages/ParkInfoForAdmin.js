import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import ParkList from '../components/ParkList'
import { stuffFetchGreenZone, stuffFetchPark } from '../http/parkAPI'

const ParkInfoForAdmin = () => {
  const { park } = useContext(Context)
  const { user } = useContext(Context)
  const [greenZones, setGreenZones] = useState()

  useEffect(() => {
    stuffFetchPark().then((data) => {
      park.setPark(data.rows)
    })
    stuffFetchGreenZone().then((data) => setGreenZones(data))
  }, [])

  return (
    <Container>
      <Row className="mt-9">
        <Col>
          <ParkList />
        </Col>
      </Row>
      {/* <Row>
      {greenZones.parks.map((el) =>
                  el.greenZones.map((el) => (

                  )))}
      </Row> */}
    </Container>
  )
}

export default ParkInfoForAdmin
