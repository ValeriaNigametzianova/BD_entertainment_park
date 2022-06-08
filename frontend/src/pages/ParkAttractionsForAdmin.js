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

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navBar/navbar.css'
import '../styles/cont/contr.css'
import '../styles/fonts/heading3.css'
import '../styles/fonts/heading2.css'
import '../styles/button/button.css'
import '../styles/fonts/heading4.css'
import '../styles/button/button.css'
import AttractionList from '../components/AttractionList'

const ParkAttractionsForAdmin = () => {
  const [park, setPark] = useState()
  const [attractions, setAttractions] = useState()
  const { id } = useParams()
  useEffect(() => {
    console.log('ddddddddddd')
    stuffFetchPark().then((data) => setPark(data.parks))
    // stuffFetchAttraction().then((data) => setAttractions(data))
  }, [])
  console.log('2', park)
  console.log('5', attractions)
  const navigate = useNavigate()
  return (
    <Container className="contr">
      <Container md={9}>
        <Row mt={5} className="heading2_1">
          <h2 style={{ color: '#151E20' }}>Аттракционы</h2>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'left', cursor: 'pointer' }}
              onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
            >
              О парке
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)}
            >
              Аттракционы
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'right', cursor: 'pointer' }}
              onClick={() => navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)}
            >
              Тарифы
            </div>
          </Col>
        </Row>
        <AttractionList></AttractionList>
        {/* <Row className="mt-9">
          {attractions &&
            attractions.attractions.map((el) =>
              el.map((el) => (
                <Row mt={5}>
                  <Row className="heading4">
                    <h2>Название: {el?.name}</h2>
                  </Row>
                  <Row className="heading4">
                    <div>Описание: {el?.description}</div>
                  </Row>
                  <Col>
                    <Row className="heading4">
                      <div>Высота: {el?.hight}</div>
                    </Row>
                    <Row className="heading4">
                      <div>Ограничение по возрасту: {el?.age_limitation}</div>
                    </Row>
                    <Row className="heading4">
                      <div>Ограничение по весу: {el?.weight_limitation}</div>
                    </Row>
                    <Row className="heading4">
                      <div>
                        Ограничение по росту:
                        {el?.height_limitation}
                      </div>
                    </Row>
                    <Row className="heading4">
                      <div>
                        {' '}
                        Максимальное количество человек:
                        {el?.max_quantity_people}
                      </div>
                    </Row>
                    <Row className="heading4">
                      <div>{el?.active ?? 'Сейчас недоступен'}</div>
                    </Row>
                  </Col>
                  <Button
                    className="button2"
                    onClick={() =>
                      navigate(STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE)
                    }
                  >
                    Обновить даннные
                  </Button>
                </Row>
              ))
            )}
        </Row> */}
        <Row>
          {attractions && attractions.attractions.lenght ? (
            {}
          ) : (
            <Button
              className="button2"
              onClick={() => navigate(STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE)}
            >
              Создать аттракцион
            </Button>
          )}
        </Row>
      </Container>
    </Container>
  )
}

export default ParkAttractionsForAdmin
