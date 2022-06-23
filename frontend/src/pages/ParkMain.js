import React, { useEffect, useState } from 'react'
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  PARK_MAIN_ROUTE,
  PARK_INFO_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_TARIF_ROUTE,
} from '../utils/Consts'
import { useParams } from 'react-router-dom'
import { customerFetchGreenZone, customerFetchOnePark } from '../http/parkAPI'
import '../styles/cont/contr.css'

const ParkMain = () => {
  const [park, setPark] = useState()
  const [greenZones, setGreenZones] = useState()
  const { id } = useParams()
  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data.park))
    customerFetchGreenZone(id).then((data) => {
      setGreenZones(data)
    })
  }, [])
  const navigate = useNavigate()

  return (
    <Container className="contr">
      <Container fluid>
        <Row className="d-flex justify-content-between ">
          <Col>
            <div
              className="heading3_2 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id)}
            >
              О парке
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(PARK_MAIN_ROUTE + '/' + id + PARK_INFO_ROUTE)
              }
            >
              Характеристики
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(PARK_MAIN_ROUTE + '/' + id + PARK_ATTRACTIONS_ROUTE)
              }
            >
              Аттракционы
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(PARK_MAIN_ROUTE + '/' + id + PARK_TARIF_ROUTE)
              }
            >
              Купить билет
            </div>
          </Col>
        </Row>
        <Row>
          <Row className=" px-5">
            <h2 className="text-start" style={{ color: '#151E20' }}>
              {park?.name}
            </h2>
          </Row>
          <Row className="mt-3 px-5">
            <div className="text-start" style={{ color: '#151E20' }}>
              {park?.description}
            </div>
          </Row>
        </Row>
        {greenZones &&
          greenZones.greenZone.map((el) => (
            <Row>
              <Row className="mt-5 px-5">
                <h2 className="text-start" style={{ color: '#151E20' }}>
                  {el?.name}
                </h2>
              </Row>
              <Row className="mt-3 px-5">
                <div className="text-start" style={{ color: '#151E20' }}>
                  {el?.description}
                </div>
              </Row>
            </Row>
          ))}
      </Container>
    </Container>
  )
}

export default ParkMain
