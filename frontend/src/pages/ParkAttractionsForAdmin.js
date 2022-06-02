import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {
  customerFetchOnePark,
  stuffFetchAttraction,
  stuffFetchPark,
} from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_MAIN_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'

const ParkAttractionsForAdmin = () => {
  const [park, setPark] = useState()
  const [attractions, setAttractions] = useState()
  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data.park))
    stuffFetchAttraction().then((data) => setAttractions(data))
  }, [])
  console.log('777', attractions)
  const navigate = useNavigate()
  return (
    <Container>
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
      <Row className="mt-9">
        <Row mt={5}>
          <h2 style={{ color: 'white' }}>Аттракционы</h2>
        </Row>
        {attractions &&
          attractions.attractions.map((el) =>
            el.map((el) => (
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
                    <div style={{ color: 'white' }}>
                      {el?.weight_limitation}
                    </div>
                  </Row>
                  <Row>
                    <div style={{ color: 'white' }}>
                      {el?.height_limitation}
                    </div>
                  </Row>
                  <Row>
                    <div style={{ color: 'white' }}>
                      {el?.max_quantity_people}
                    </div>
                  </Row>
                  <Row>
                    <div style={{ color: 'white' }}>
                      {el?.active ?? 'Сейчас недоступен'}
                    </div>
                  </Row>
                </Col>
              </Row>
            ))
          )}
      </Row>
      <Row>
        {attractions ? (
          <Button
            onClick={() => navigate(STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE)}
          >
            Обновить даннные
          </Button>
        ) : (
          <Button
            onClick={() => navigate(STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE)}
          >
            Создать аттракцион
          </Button>
        )}
      </Row>
    </Container>
  )
}

export default ParkAttractionsForAdmin
