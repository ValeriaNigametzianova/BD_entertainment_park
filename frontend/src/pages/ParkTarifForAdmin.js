import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import TarifList from '../components/TarifList'
import { stuffFetchPark, stuffFetchTarif } from '../http/parkAPI'
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

const ParkTarifForAdmin = () => {
  const [park, setPark] = useState()
  const [tarif, setTarif] = useState()
  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data.park))
    stuffFetchTarif().then((data) => setTarif(data))
  }, [])
  console.log('777', tarif)
  const navigate = useNavigate()
  return (
    <Container md={9}>
      <Row className="d-flex justify-content-between">
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
          >
            О парке
          </div>
        </Col>
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
      <Row mt-5>
        <h2 style={{ color: 'white' }}>Тариф</h2>
      </Row>
      <Row>
        {tarif &&
          tarif.tarifs.map((el) =>
            el.map((el) => (
              <Col>
                <Row>
                  <div style={{ color: 'white' }}>Название: "{el?.name}</div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>Стоимость: {el?.cost}</div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Описание: {el?.description}
                  </div>
                </Row>
              </Col>
            ))
          )}
      </Row>
    </Container>
  )
}

export default ParkTarifForAdmin
