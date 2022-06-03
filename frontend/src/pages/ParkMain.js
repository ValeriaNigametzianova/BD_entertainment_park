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
import '../styles/cont/contr.css'

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
    <Container className="contr">
      <Container md={9}>
        <Row className="d-flex justify-content-between">
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'left', cursor: 'pointer' }}
              onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id)}
            >
              О парке
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() =>
                navigate(PARK_MAIN_ROUTE + '/' + id + PARK_INFO_ROUTE)
              }
            >
              Характеристики
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() =>
                navigate(PARK_MAIN_ROUTE + '/' + id + PARK_ATTRACTIONS_ROUTE)
              }
            >
              Аттракционы
            </div>
          </Col>
          <Col>
            <div
              style={{ textAlign: 'right', cursor: 'pointer' }}
              onClick={() =>
                navigate(PARK_MAIN_ROUTE + '/' + id + PARK_TARIF_ROUTE)
              }
            >
              Купить билет
            </div>
          </Col>
        </Row>
        <Row>
          <h2 style={{ color: '#151E20' }}>{park?.name}</h2>
        </Row>
        <Row>
          <div style={{ color: '#151E20' }}>{park?.description}</div>
        </Row>
        {greenZones &&
          greenZones.greenZone.map((el) => (
            <Row>
              <Row mt={5}>
                <h2 style={{ color: '#151E20' }}>{el?.name}</h2>
                <div style={{ color: '#151E20' }}> {el?.description}</div>
              </Row>
            </Row>
          ))}
      </Container>
    </Container>
  )
}

export default ParkMain
