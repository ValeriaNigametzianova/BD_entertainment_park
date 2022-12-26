import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Container, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { customerFetchOnePark } from '../http/parkAPI'
import { PARK_MAIN_ROUTE, PARK_INFO_ROUTE, PARK_ATTRACTIONS_ROUTE, PARK_TARIF_ROUTE } from '../utils/Consts'
import '../styles/fonts/fonts.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const ParkInfo = observer(() => {
  const navigate = useNavigate()
  const { park } = useContext(Context)
  const { id } = useParams()
  const [Park, setPark] = useState()
  useEffect(() => {
    park.setIsLoading(true)
    customerFetchOnePark(id)
      .then((data) => {
        setPark(data.park)
      })
      .finally(() => park.setIsLoading(false))
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
              onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id + PARK_INFO_ROUTE)}
            >
              Характеристики
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id + PARK_ATTRACTIONS_ROUTE)}
            >
              Аттракционы
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id + PARK_TARIF_ROUTE)}
            >
              Купить билет
            </div>
          </Col>
        </Row>
        <Row className=" px-5">
          <h2 className="text-start heading2 description">Информация</h2>
        </Row>
        {park.isLoading ? (
          <div
            style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', top: '50%', marginTop: '60px' }}
          >
            <Spinner animation={'border'} className={'text-light'} style={{ position: 'relative' }} />
          </div>
        ) : (
          <div>
            <Row className=" px-5">
              <Col>
                {Park?.square && (
                  <Row>
                    <div className="description">Площадь: {Park?.square}м²</div>
                  </Row>
                )}
                {Park?.opening_time && (
                  <Row>
                    <div className="description">Время открытия: {Park?.opening_time.substr(0, 5)}</div>
                  </Row>
                )}
                {Park?.closing_time && (
                  <Row>
                    <div className="description">Время закрытия: {Park?.closing_time.substr(0, 5)}</div>
                  </Row>
                )}
              </Col>
              <Col>
                {Park?.animators && (
                  <Row>
                    <div className="description">Есть аниматоры</div>
                  </Row>
                )}
                {Park?.watersafe && (
                  <Row>
                    <div className="description">Есть водные пространства</div>
                  </Row>
                )}
                {Park?.zoo && (
                  <Row>
                    <div className="description">Есть зооуголки</div>
                  </Row>
                )}
              </Col>
              <Col>
                {Park?.cafe && (
                  <Row>
                    <div className="description">Количество кафе: {Park?.cafe}</div>
                  </Row>
                )}
                {Park?.shops && <Row>{<div className="description">Количество магазинов: {Park?.shops}</div>}</Row>}
              </Col>
            </Row>
            {Park?.adress && (
              <Row className=" px-5">
                <div className="pt-5 description">Адрес: {Park?.adress}</div>
              </Row>
            )}
          </div>
        )}
      </Container>
    </Container>
  )
})

export default ParkInfo
