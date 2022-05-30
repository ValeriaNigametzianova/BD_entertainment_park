import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '..'
import { stuffFetchGreenZone, stuffFetchPark } from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_INFO_ROUTE,
  PARK_MAIN_ROUTE,
  PARK_TARIF_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'

const ParkMainForAdmin = () => {
  const { park } = useContext(Context)
  const { greenZone } = useContext(Context)
  // const [park, setPark] = useState()
  // const [greenZone, setGreenZone] = useState()
  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => {
      park.setPark(data.parks)
    })
    stuffFetchPark().then((data) => {
      greenZone.setPark(data.greenZone)
    })
  }, [])
  const navigate = useNavigate()

  return (
    <Container md={9}>
      <Row className="d-flex justify-content-between">
        <Container md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
          >
            О парке
          </div>
        </Container>
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)}
          >
            Аттракционы
          </div>
        </Col>
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)}
          >
            Тарифы
          </div>
        </Col>
      </Row>
      <Row>
        <h2 style={{ color: 'white' }}>{park?.name}</h2>
      </Row>
      <Row>
        <div style={{ color: 'white' }}>{park?.description}</div>
      </Row>
      <Row mt={5}>
        <h2 style={{ color: 'white' }}>{greenZone?.name}</h2>
        <div style={{ color: 'white' }}> {greenZone?.description}</div>
      </Row>
      <Row>
        {park ? (
          <Button>Создать парк</Button>
        ) : (
          <Button>Обновить даннные</Button>
        )}
      </Row>
    </Container>
  )
}

export default ParkMainForAdmin
