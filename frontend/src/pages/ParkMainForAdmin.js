import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '..'
import { stuffFetchGreenZone, stuffFetchPark } from '../http/parkAPI'
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
import '../styles/navBar/navbar.css'
import '../styles/cont/contr.css'
import '../styles/fonts/heading3.css'

const ParkMainForAdmin = () => {
  const [park, setPark] = useState()
  const [greenZones, setGreenZones] = useState()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data))
    stuffFetchGreenZone().then((data) => setGreenZones(data))
  }, [])
  const navigate = useNavigate()
  console.log('2', park)
  console.log('4', greenZones)
  return (
      <Container className='contr'>
    <Container md={9}>
      <Row className="d-flex">
        <Col >
          <div
              className='heading3_2'
            style={{  cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
          >
            О парке
          </div>
        </Col>
        <Col >
          <div className='heading3_2'
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)}
          >
            Аттракционы
          </div>
        </Col>
        <Col>
          <div
              className='heading3_2'
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)}
          >
            Тарифы
          </div>
        </Col>
      </Row>
      <Row mt={5}>
        <h2 style={{ color: 'white' }}>Парк </h2>
      </Row>
      {console.log('hii', { park })}
      {/* {console.log(
              'el.name',
              park.parks.map((el) => el.name)
            )} */}
      {park &&
        park.parks.map((el) => {
          el = el.park
          return (
            <Row>
              <Col md={9}>
                <Row>
                  <h2 style={{ color: 'white' }}> {el?.name}</h2>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>Площадь: {el?.square}</div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Время открытия: {el?.opening_time}
                  </div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Время закрытия: {el?.closing_time}
                  </div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Описание: {el?.description}
                  </div>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <div style={{ color: 'white' }}>
                    Наличие аниматоров: {el?.animators}
                  </div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Наличие водных пространств: {el?.watersafe}
                  </div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Наличие уголка с животными: {el?.zoo}
                  </div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Количетво кафе и ресторанов: {el?.cafe}
                  </div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Количество магазинов и сувенирных лавок: {el?.shops}
                  </div>
                </Row>
              </Col>
            </Row>
          )
        })}
      {greenZones &&
        greenZones.parks.map((el) =>
          el.greenZones.map((el) => (
            <Row>
              <Row mt={5}>
                <h2 style={{ color: 'white' }}>{el?.name}</h2>
                <div style={{ color: 'white' }}>{el?.description}</div>
              </Row>
            </Row>
          ))
        )}
      <Row className='d-flex'>
        {park && park.parks.length ? (
          <Button className='button' onClick={() => navigate(STUFF_ROUTE + PARK_MAIN_ROUTE)}>
            Обновить даннные
          </Button>
        ) : (
          <Button className='button' onClick={() => navigate(STUFF_ROUTE + PARK_MAIN_ROUTE)}>
            Создать парк
          </Button>
        )}
      </Row>
    </Container>
      </Container>
  )
}

export default ParkMainForAdmin
