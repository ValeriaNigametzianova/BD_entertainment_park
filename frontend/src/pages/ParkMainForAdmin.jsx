import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Button, Image, Spinner, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { deletePark, deletePhoto, stuffFetchGreenZone, stuffFetchPark } from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  PARK_MAIN_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'
import '../styles/navBar/navbar.css'
import '../styles/container/container.css'
import '../styles/button/button.css'
import '../styles/fonts/fonts.css'
import { observer, useObserver } from 'mobx-react-lite'
import { Context } from '../index'

const ParkMainForAdmin = observer(() => {
  const [parks, setParks] = useState()
  const [greenZones, setGreenZones] = useState()
  const [isLoading, setIsLoading] = useState()
  const { park } = useContext(Context)
  useEffect(() => {
    setIsLoading(true)
    fetchData().finally(() => setIsLoading(false))
  }, [])

  const navigate = useNavigate()

  const fetchData = async () => {
    await stuffFetchPark().then((data) => setParks(data))
    await stuffFetchGreenZone().then((data) => setGreenZones(data))
  }
  const destroyPark = async (deletedPark) => {
    setIsLoading(true)
    await deletePark(deletedPark.id)
      .then((data) => {
        if (park) deletePhoto(`${deletedPark.id}` + '.jpg')
        setParks({ parks: parks.parks.filter((p) => p.park.id != deletedPark.id) })
        setGreenZones({ parks: parks.parks.filter((p) => p.greenZones.map((el) => el.ParkId != deletedPark.id)) })
        park.setAlertMessage(data.message)
        park.setAlertStatus(data.status)
        if (data.status !== 200) park.setVisible(true)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Container className="contr">
      <Container md={9}>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="border text-light mt-5" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        ) : (
          <Col>
            <Row className="d-flex">
              <Col>
                <div
                  className="heading3_2 active-page"
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
                      <Row className="heading2_1 description">
                        <div> {el?.name}</div>
                      </Row>
                      <Row className="description">
                        <div>Город: {el?.town}</div>
                      </Row>
                      <Row className="description">
                        <div>Площадь: {el?.square}</div>
                      </Row>
                      <Row className="description">
                        <div>Время открытия: {el?.opening_time.substr(0, 5)}</div>
                      </Row>
                      <Row className="description">
                        <div>Время закрытия: {el?.closing_time.substr(0, 5)}</div>
                      </Row>
                      <Row className="description">
                        <div>Описание: {el?.description}</div>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row className="description">
                        <div>{el?.animators ? `Наличие аниматоров: : есть` : 'Наличие аниматоров: : нет'}</div>
                      </Row>
                      <Row className="description">
                        <div>
                          {el?.watersafe ? `Наличие одных пространств: есть` : 'Наличие одных пространств: нет'}
                        </div>
                      </Row>
                      <Row className="description">
                        <div>{el?.zoo ? `Наличие уголка с животными: есть` : 'Наличие уголка с животными: нет'}</div>
                      </Row>
                      <Row className="description">
                        <div>Количетво кафе и ресторанов: {el?.cafe}</div>
                      </Row>
                      <Row className="description">
                        <div>Количество магазинов и сувенирных лавок: {el?.shops}</div>
                      </Row>
                      <Row className="description">
                        <div>Адрес: {el?.adress}</div>
                      </Row>
                    </Col>
                    <Image className="my-5" width="100%" src={process.env.REACT_APP_API_URL + `${el?.id}` + `.jpg`} />
                  </Row>
                )
              })}
            {greenZones &&
              parks.parks.length &&
              greenZones.parks.map((el) =>
                el.greenZones.map((el) => (
                  <Col>
                    <div className="heading2_1 description mt={5}">Зоны отдыха в парке развлечений</div>
                    <Row key={el.id}>
                      <Row mt={5}>
                        <div className="heading3_2 description">{el?.name}</div>
                        <div className="description">Описание: {el?.description}</div>
                      </Row>
                    </Row>
                  </Col>
                ))
              )}
            <Row className="d-flex my-5">
              {parks && parks.parks.length ? (
                <Row>
                  <Col>
                    {parks.parks.map((el) => {
                      el = el.park
                      return (
                        <Button key={el.id} className="button-warning" onClick={() => destroyPark(el)}>
                          Удалить парк
                        </Button>
                      )
                    })}
                  </Col>
                  <Col>
                    <Button className="button-green" onClick={() => navigate(STUFF_ROUTE + PARK_MAIN_ROUTE)}>
                      Обновить даннные
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Button className="button2" onClick={() => navigate(STUFF_ROUTE + PARK_MAIN_ROUTE)}>
                  Создать парк
                </Button>
              )}
            </Row>
          </Col>
        )}
      </Container>
    </Container>
  )
})

export default ParkMainForAdmin
