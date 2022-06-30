import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { customerFetchAttraction, customerFetchOnePark } from '../http/parkAPI'
import {
  PARK_ATTRACTIONS_ROUTE,
  PARK_INFO_ROUTE,
  PARK_MAIN_ROUTE,
  PARK_TARIF_ROUTE,
} from '../utils/Consts'
import '../styles/fonts/fonts.css'

const ParkAttractions = () => {
  const [park, setPark] = useState()
  const [attractions, setAttractions] = useState()
  const { id } = useParams()
  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data))
    customerFetchAttraction(id).then((data) => setAttractions(data))
  }, [])
  const navigate = useNavigate()
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
              className="heading3_2 text-center active-page"
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
        {attractions &&
          attractions.map((el) => (
            <Row className="mb-5 px-5">
              <Row>
                <h2 className="heading3 description">{el?.name}</h2>
              </Row>
              <Row>
                <div className="description">{el?.description}</div>
              </Row>
              <Col>
                <Row>
                  <div className="description">Высота: {el?.hight}</div>
                </Row>
                <Row>
                  <div className="description">
                    Возрастное ограничение: {el?.age_limitation}
                  </div>
                </Row>
                <Row>
                  <div className="description">
                    Ограничение по весу: {el?.weight_limitation}
                  </div>
                </Row>
                <Row>
                  <div className="description">
                    Ограничение по росту: {el?.height_limitation}
                  </div>
                </Row>
                <Row>
                  <div className="description">
                    Максимальное количество посетителей:
                    {el?.max_quantity_people}
                  </div>
                </Row>
                <Row>
                  <div className="description">
                    {el?.active ?? 'Сейчас недоступен'}
                  </div>
                </Row>
              </Col>
            </Row>
          ))}
      </Container>
    </Container>
  )
}

export default ParkAttractions
