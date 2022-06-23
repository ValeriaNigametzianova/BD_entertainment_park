import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  deletePark,
  stuffFetchGreenZone,
  stuffFetchPark,
} from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  PARK_MAIN_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'
import EditingParkInfo from './EditingParkInfo'
import '../styles/navBar/navbar.css'
import '../styles/cont/contr.css'
import '../styles/button/button.css'
import '../styles/fonts/fonts.css'

const ParkMainForAdmin = () => {
  const [parks, setParks] = useState()
  const [greenZones, setGreenZones] = useState()
  useEffect(() => {
    stuffFetchPark().then((data) => setParks(data))
    stuffFetchGreenZone().then((data) => setGreenZones(data))
  }, [])
  const navigate = useNavigate()

  const destroyPark = (deletedPark) => {
    setParks({ parks: parks.parks.filter((p) => p.park.id != deletedPark.id) })
    deletePark(deletedPark.id).then((data) => {})
  }

  return (
    <Container className="contr">
      <Container md={9}>
        <Row className="d-flex">
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'left', cursor: 'pointer' }}
              onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
            >
              Парк
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
        {parks &&
          parks?.parks.map((el) => {
            el = el.park
            return (
              <Row key={el.id} park={el}>
                <Col md={9}>
                  <Row className="heading2_1">
                    <div> {el?.name}</div>
                  </Row>
                  <Row className="heading4">
                    <div>Площадь: {el?.square}</div>
                  </Row>
                  <Row className="heading4">
                    <div>Время открытия: {el?.opening_time}</div>
                  </Row>
                  <Row className="heading4">
                    <div>Время закрытия: {el?.closing_time}</div>
                  </Row>
                  <Row className="heading4">
                    <div>Описание: {el?.description}</div>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row className="heading4">
                    <div>Наличие аниматоров: {el?.animators}</div>
                  </Row>
                  <Row className="heading4">
                    <div>Наличие водных пространств: {el?.watersafe}</div>
                  </Row>
                  <Row className="heading4">
                    <div>Наличие уголка с животными: {el?.zoo}</div>
                  </Row>
                  <Row className="heading4">
                    <div>Количетво кафе и ресторанов: {el?.cafe}</div>
                  </Row>
                  <Row className="heading4">
                    <div>
                      Количество магазинов и сувенирных лавок: {el?.shops}
                    </div>
                  </Row>
                </Col>
                <Image
                  className="my-5"
                  width="100%"
                  src={process.env.REACT_APP_API_URL + `${el.id}.jpg`}
                />
              </Row>
            )
          })}
        <div className="heading2_1 mt={5}" style={{ color: 'black' }}>
          Зоны отдыха в парке развлечений
        </div>
        {greenZones &&
          greenZones.parks.map((el) =>
            el.greenZones.map((el) => (
              <Row key={el.id}>
                <Row mt={5}>
                  <div className="heading4">{el?.name}</div>
                  <div className="heading4">{el?.description}</div>
                </Row>
              </Row>
            ))
          )}
        <Row className="d-flex my-5">
          {parks && parks.parks.length ? (
            <Row>
              <Col>
                {parks.parks.map((el) => {
                  el = el.park
                  return (
                    <Button
                      key={el.id}
                      className="button-warning"
                      onClick={() => destroyPark(el)}
                    >
                      Удалить парк
                    </Button>
                  )
                })}
              </Col>
              <Col>
                <Button
                  className="button2"
                  onClick={() => navigate(STUFF_ROUTE + PARK_MAIN_ROUTE)}
                >
                  Обновить даннные
                </Button>
              </Col>
            </Row>
          ) : (
            <Button
              className="button2"
              onClick={() => navigate(STUFF_ROUTE + PARK_MAIN_ROUTE)}
            >
              Создать парк
            </Button>
          )}
        </Row>
      </Container>
    </Container>
  )
}

export default ParkMainForAdmin
