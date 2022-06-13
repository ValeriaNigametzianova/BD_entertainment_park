import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '..'
import {
  deletePark,
  stuffFetchGreenZone,
  stuffFetchPark,
} from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_INFO_ROUTE,
  PARK_MAIN_ROUTE,
  PARK_TARIF_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'
import EditingParkInfo from './EditingParkInfo'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navBar/navbar.css'
import '../styles/cont/contr.css'
import '../styles/fonts/heading3.css'
import '../styles/fonts/heading2.css'
import '../styles/button/button.css'
import '../styles/fonts/heading4.css'

const ParkMainForAdmin = () => {
  const [parks, setParks] = useState()
  const [greenZones, setGreenZones] = useState()
  useEffect(() => {
    console.log('UE')
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
        <Row mt={5}>
          {/*className="contr1"*/}
          <h2 className="heading2_1" style={{ color: 'black' }}>
            Парк
          </h2>
        </Row>
        <Row className="d-flex">
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
        {console.log('hii', parks)}
        {/* {console.log(
              'el.name',
              park.parks.map((el) => el.name)
            )} */}
        {parks &&
          parks?.parks.map((el) => {
            el = el.park
            return (
              <Row key={el.id} park={el}>
                {console.log('park', parks)}
                <Col md={9}>
                  <Row className="heading2_1">
                    <h2> {el?.name}</h2>
                  </Row>
                  <Row>
                    <div className="heading4">Площадь: {el?.square}</div>
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
              </Row>
            )
          })}
        <h2 className="heading2_1 mt={5}" style={{ color: 'black' }}>
          Зоны отдыха в парке развлечений
        </h2>
        {greenZones &&
          greenZones.parks.map((el) =>
            el.greenZones.map((el) => (
              <Row key={el.id}>
                <Row mt={5}>
                  <h2 className="heading4">{el?.name}</h2>
                  <div className="heading4">{el?.description}</div>
                </Row>
              </Row>
            ))
          )}
        <Row className="d-flex">
          {parks && parks.parks.length ? (
            <Row>
              <Col>
                {parks.parks.map((el) => {
                  el = el.park
                  return (
                    <Button
                      key={el.id}
                      className="button2"
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
