import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../index'
import {
  PARK_MAIN_ROUTE,
  PARK_INFO_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_TARIF_ROUTE,
} from '../utils/Consts'
import { useParams } from 'react-router-dom'
import {
  customerFetchGreenZone,
  customerFetchOnePark,
  customerFetchPark,
} from '../http/parkAPI'

const ParkMain = () => {
  const [park, setPark] = useState()
  const [greenZones, setGreenZones] = useState()
  const { id } = useParams()
  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data.park))
    customerFetchGreenZone(id).then((data) => {
      setGreenZones(data)
      console.log('d ', data)
    })
  }, [])
  console.log('11', park)
  console.log('00', greenZones)
  const navigate = useNavigate()

  return (
    <Container md={9}>
      <Row className="d-flex justify-content-between">
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id)}
          >
            О парке
          </div>
        </Col>
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() =>
              navigate(PARK_MAIN_ROUTE + '/' + id + PARK_INFO_ROUTE)
            }
          >
            Характеристики
          </div>
        </Col>
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() =>
              navigate(PARK_MAIN_ROUTE + '/' + id + PARK_ATTRACTIONS_ROUTE)
            }
          >
            Аттракционы
          </div>
        </Col>
        <Col md={1}>
          <div
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() =>
              navigate(PARK_MAIN_ROUTE + '/' + id + PARK_TARIF_ROUTE)
            }
          >
            Купить билет
          </div>
        </Col>
      </Row>
      <Row>
        <h2 style={{ color: 'white' }}>{park?.name}</h2>
      </Row>
      <Row>
        <div style={{ color: 'white' }}>{park?.description}</div>
      </Row>
      {greenZones &&
        greenZones.greenZone.map((el) => (
          <Row>
            <Row mt={5}>
              <h2 style={{ color: 'white' }}>{el?.name}</h2>
              <div style={{ color: 'white' }}> {el?.description}</div>
            </Row>
          </Row>
        ))}
    </Container>
  )
}

export default ParkMain
