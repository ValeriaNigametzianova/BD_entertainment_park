import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import OrderForm from '../components/OrderForm'
import TarifItem from '../components/TarifItem'
import TarifList from '../components/TarifList'
import CalendarStore from '../store/CalendarStore'
import { customerFetchOnePark, customerFetchTarif } from '../http/parkAPI'
import {
  CUSTOMER_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_INFO_ROUTE,
  PARK_MAIN_ROUTE,
  PARK_TARIF_ROUTE,
  TICKETS_ROUTE,
} from '../utils/Consts'
import { createTicket } from '../http/ticketApi'
import { customerLogin } from '../http/customerAPI'
import { Context } from '..'
import axios from 'axios'
import { saveAs } from 'file-saver'

const ParkTarifs = () => {
  const { user } = useContext(Context)
  const [park, setPark] = useState()
  const [tarifs, setTarifs] = useState()
  const [order, setOrder] = useState()
  const { id } = useParams()
  const [total, setTotal] = useState(false)
  const [summ, setSumm] = useState(0)

  const lk = async () => {
    let data
    data = await customerLogin(order.customer?.email)
    user.setUser(data)
    user.setIsAuth(true)
    user.setRole(data.role)
  }

  useEffect(() => {
    customerFetchOnePark(id).then((data) => setPark(data))
    customerFetchTarif(id).then((data) => setTarifs(data))
  }, [])
  const navigate = useNavigate()
  console.log('tarif', tarifs)
  console.log('order', order)

  const createOrder = (customer) => {
    if (!order?.date || !order?.tarifs) return console.log('not work')
    setOrder({ ...order, customer })
    setTotal(true)
    let TarifId = Object.getOwnPropertyNames(order.tarifs).map(
      (el) => order.tarifs[`${el}`]
    )
    console.log(' TarifId', TarifId)
    let tsumm = summ
    TarifId.map((element) => {
      console.log('element.tarif?.cost', element.tarif?.cost)
      console.log(' element?.counter', element?.counter)
      console.log('summ', tsumm)
      console.log(
        'summ + element.tarif?.cost * element?.counter',
        tsumm + element.tarif?.cost * element?.counter
      )
      return (tsumm += element.tarif?.cost * element?.counter)
    })
    setSumm(tsumm)
  }

  const newTicket = () => {
    createTicket(order).then((data) => {})
    console.log(order)
  }

  // const createAndDownloadPdf = () => {
  //   axios
  //     .post('/create-pdf', this.state)
  //     .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
  //     .then((res) => {
  //       const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

  //       saveAs(pdfBlob, 'newPdf.pdf')
  //     })
  // }

  return (
    <div>
      {total ? (
        <Container md={8} style={{ color: 'white' }}>
          <h2>Итог</h2>
          <Row>
            <Col>
              <div>Фамилия</div>
            </Col>
            <Col>
              <div>{order.customer?.surname}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>Имя</div>
            </Col>
            <Col>
              <div>{order.customer?.name}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>Почта</div>
            </Col>
            <Col>
              <div>{order.customer?.email}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>Номер телефона</div>
            </Col>
            <Col>
              <div>{order.customer?.phone_number}</div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div>Билеты</div>
            </Col>
            <Col>
              {Object.getOwnPropertyNames(order.tarifs).map((el) => (
                <div>{order.tarifs[`${el}`].tarif?.name}</div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <div>Сумма: </div>
            </Col>
            <Col>
              <div>{summ}</div>
            </Col>
          </Row>

          <Button
            onClick={async () => {
              newTicket(order)
              await lk()
              navigate(CUSTOMER_ROUTE + TICKETS_ROUTE)
            }}
          >
            Подтвердить покупку
          </Button>
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
                  <TarifItem
                    key={el.id}
                    tarif={el}
                    addTarifs={(tarifs) => {
                      setOrder({
                        ...order,
                        tarifs: { ...order?.tarifs, ...tarifs },
                      })
                    }}
                  ></TarifItem>
                ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <OrderForm createOrder={createOrder}></OrderForm>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default ParkTarifs
