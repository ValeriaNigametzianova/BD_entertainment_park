import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import OrderForm from '../components/OrderForm'
import TarifItem from '../components/TarifItem'
import TarifList from '../components/TarifList'
import CalendarStore from '../store/CalendarStore'
import { customerFetchOnePark, customerFetchTarif } from '../http/parkAPI'
import {
  PARK_ATTRACTIONS_ROUTE,
  PARK_INFO_ROUTE,
  PARK_MAIN_ROUTE,
  PARK_TARIF_ROUTE,
} from '../utils/Consts'

const ParkTarifs = () => {
  const [park, setPark] = useState()
  const [tarifs, setTarifs] = useState()
  const [order, setOrder] = useState()
  const { id } = useParams()
  const [total, setTotal] = useState(false)

  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data))
    customerFetchTarif(id).then((data) => setTarifs(data))
  }, [])
  const navigate = useNavigate()
  console.log('tarif', tarifs)
  console.log('order', order?.date)

  const creatOrder = (customer) => {
    if (!order?.date || !order?.tarif) return
    setOrder({ ...order, customer })
    setTotal(true)
  }

  return (
    <div>
      {total ? (
        <Container md={8}>
          <h2>Итог</h2>
          <Row>
            <Col>
              <div>Фамилия</div>
            </Col>
            <Col>
              <div></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>Имя</div>
            </Col>
            <Col>
              <div></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>Почта</div>
            </Col>
            <Col>
              <div></div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container md={8}>
          <Row className="d-flex justify-content-between">
            <Col md={2}>
              <div
                style={{ color: 'green', cursor: 'pointer' }}
                onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id)}
              >
                О парке
              </div>
            </Col>
            <Col md={2}>
              <div
                style={{ color: 'green', cursor: 'pointer' }}
                onClick={() =>
                  navigate(PARK_MAIN_ROUTE + '/' + id + PARK_INFO_ROUTE)
                }
              >
                Характеристики
              </div>
            </Col>
            <Col md={2}>
              <div
                style={{ color: 'green', cursor: 'pointer' }}
                onClick={() =>
                  navigate(PARK_MAIN_ROUTE + '/' + id + PARK_ATTRACTIONS_ROUTE)
                }
              >
                Аттракционы
              </div>
            </Col>
            <Col md={2}>
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
          <Row mt-5 mb-5>
            <h2 style={{ color: 'white' }}>Тарифы</h2>
          </Row>
          <Row lassName="align-center">
            <Col>
              <div>
                {order?.date && (
                  <p>Выбранная дата: {order?.date.toLocaleDateString()}</p>
                )}

                <CalendarStore
                  value={order?.date}
                  onChange={(date) => setOrder({ ...order, date })}
                />
              </div>
            </Col>
            <Col>
              {tarifs &&
                tarifs.map((el) => (
                  <Row>
                    <TarifItem key={el.id} tarif={el}></TarifItem>
                  </Row>
                ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <OrderForm createOrder={order}></OrderForm>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default ParkTarifs
