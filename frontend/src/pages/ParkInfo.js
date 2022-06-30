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
import '../styles/fonts/fonts.css'

const ParkInfo = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [park, setPark] = useState()
  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data.park))
  }, [])
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
              className="heading3_2 text-center active-page"
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
          <h2 className="text-start heading2 description">Информация</h2>
        </Row>
        <Row className=" px-5">
          <Col>
            {park?.square && (
              <Row>
                <div className="description">Площадь: {park?.square}</div>
              </Row>
            )}
            {park?.opening_time && (
              <Row>
                <div className="description">
                  Время открытия: {park?.opening_time}
                </div>
              </Row>
            )}
            {park?.closing_time && (
              <Row>
                <div className="description">
                  Время закрытия: {park?.closing_time}
                </div>
              </Row>
            )}
          </Col>
          <Col>
            {park?.animators && (
              <Row>
                <div className="description">
                  Наличие аниматоров: {park?.animators}
                </div>
              </Row>
            )}
            {park?.watersafe && (
              <Row>
                <div className="description">Есть водные пространства</div>
              </Row>
            )}
            {park?.zoo && (
              <Row>
                <div className="description">Есть зооуголки</div>
              </Row>
            )}
          </Col>
          <Col>
            {park?.cafe && (
              <Row>
                <div className="description">Количество кафе: {park?.cafe}</div>
              </Row>
            )}
            {park?.shops && (
              <Row>
                <div className="description">
                  Количество магазинов: {park?.shops}
                </div>
              </Row>
            )}
          </Col>
        </Row>
        {park?.adress && (
          <Row className=" px-5">
            <div className="pt-5 description">Адрес: {park?.adress}</div>
          </Row>
        )}
      </Container>
    </Container>
  )
}

export default ParkInfo
