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

const ParkAttractions = () => {
  const [park, setPark] = useState()
  const [attractions, setAttractions] = useState()
  const { id } = useParams()
  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data))
    customerFetchAttraction(id).then((data) => setAttractions(data))
  }, [])
  const navigate = useNavigate()
  console.log('attractions', attractions)
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
      <Row mt-5>
        <h2 style={{ color: 'white' }}>Аттракционы</h2>
      </Row>
      {attractions &&
        attractions.map((el) => (
          <Row>
            <Row>
              <h2 style={{ color: 'white' }}>{el?.name}</h2>
            </Row>
            <Row>
              <div style={{ color: 'white' }}>{el?.description}</div>
            </Row>
            <Col>
              <Row>
                <div style={{ color: 'white' }}>{el?.hight}</div>
              </Row>
              <Row>
                <div style={{ color: 'white' }}>{el?.age_limitation}</div>
              </Row>
              <Row>
                <div style={{ color: 'white' }}>{el?.weight_limitation}</div>
              </Row>
              <Row>
                <div style={{ color: 'white' }}>{el?.height_limitation}</div>
              </Row>
              <Row>
                <div style={{ color: 'white' }}>{el?.max_quantity_people}</div>
              </Row>
              <Row>
                <div style={{ color: 'white' }}>
                  {el?.active ?? 'Сейчас недоступен'}
                </div>
              </Row>
            </Col>
          </Row>
        ))}
    </Container>
  )
}

export default ParkAttractions
