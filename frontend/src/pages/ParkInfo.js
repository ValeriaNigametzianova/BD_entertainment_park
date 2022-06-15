import React, { useEffect, useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { customerFetchOnePark } from '../http/parkAPI'
import {
  PARK_MAIN_ROUTE,
  PARK_INFO_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_TARIF_ROUTE,
} from '../utils/Consts'

const ParkInfo = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [park, setPark] = useState()
  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data.park))
  }, [])
  console.log(park)
  return (
    <Container className="contr">
      <Container fluid>
        <Row className="d-flex justify-content-between">
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
        <Row className=" px-5">
          <h2 style={{ color: '#151E20' }}>Информация</h2>
        </Row>
        <Row>
          <Col>
            <Row>
              <div style={{ color: '#151E20' }}>Площадь: {park?.square}</div>
            </Row>
            <Row>
              <div style={{ color: '#151E20' }}>
                Время открытия: {park?.opening_time}
              </div>
            </Row>
            <Row>
              <div style={{ color: '#151E20' }}>
                Время закрытия: {park?.closing_time}
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              <div style={{ color: '#151E20' }}>
                Наличие аниматоров: {park?.animators}
              </div>
            </Row>
            <Row>
              <div style={{ color: '#151E20' }}>
                Наличие водоемов: {park?.watersafe}
              </div>
            </Row>
            <Row>
              <div style={{ color: '#151E20' }}>
                Наличие зооуголков: {park?.zoo}
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              <div style={{ color: '#151E20' }}>
                Количество кафе: {park?.cafe}
              </div>
            </Row>
            <Row>
              <div style={{ color: '#151E20' }}>
                Количество магазинов: {park?.shops}
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className="pt-5" style={{ color: '#151E20' }}>
            Адрес: {park?.adress}
          </div>
        </Row>
      </Container>
    </Container>
  )
}

export default ParkInfo
