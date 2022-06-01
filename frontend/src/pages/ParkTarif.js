import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import TarifList from '../components/TarifList'
import { stuffFetchPark, stuffFetchTarif } from '../http/parkAPI'
import {
  PARK_ATTRACTIONS_ROUTE,
  PARK_INFO_ROUTE,
  PARK_MAIN_ROUTE,
  PARK_TARIF_ROUTE,
} from '../utils/Consts'

const ParkAttractions = () => {
  const [park, setPark] = useState()
  const [tarif, setTarif] = useState()
  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark(id).then((data) => setPark(data))
    stuffFetchTarif(id).then((data) => setTarif(data))
  }, [])
  const navigate = useNavigate()

  return (
    <Container md={9}>
      <Row className="d-flex justify-content-between">
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => navigate(PARK_MAIN_ROUTE + '/' + park.id)}
          >
            О парке
          </div>
        </Col>
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() =>
              navigate(PARK_MAIN_ROUTE + '/' + park.id + PARK_INFO_ROUTE)
            }
          >
            Характеристики
          </div>
        </Col>
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() =>
              navigate(PARK_MAIN_ROUTE + '/' + park.id + PARK_ATTRACTIONS_ROUTE)
            }
          >
            Аттракционы
          </div>
        </Col>
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() =>
              navigate(PARK_MAIN_ROUTE + '/' + park.id + PARK_TARIF_ROUTE)
            }
          >
            Купить билет
          </div>
        </Col>
      </Row>
      <Row mt-5>
        <h2 style={{ color: 'white' }}>Тариф</h2>
      </Row>
      <Row>{/* <TarifList /> */}</Row>
    </Container>
  )
}

export default ParkAttractions
