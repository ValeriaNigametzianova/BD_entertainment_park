import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import OrderForm from '../components/OrderForm'
import TarifItem from '../components/TarifItem'
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
// import { saveAs } from 'file-saver'

const ParkTarif = () => {
  const { park } = useContext(Context)
  const { user } = useContext(Context)
  const [tarifs, setTarifs] = useState([])
  const [order, setOrder] = useState()
  const { id } = useParams()
  const [total, setTotal] = useState(false)
  const [summ, setSumm] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    park.setIsLoading(true)
    customerFetchTarif(id)
      .then((data) => {
        setTarifs(data)
      })
      .finally(() => park.setIsLoading(false))
  }, [id])

  const lk = async () => {
    let data
    data = await customerLogin(order.customer?.email)
    user.setUser(data.user)
    user.setIsAuth(true)
    user.setRole(data.user.role)
    return data
  }

  const createOrder = (customer) => {
    let TarifId = Object.getOwnPropertyNames(order.tarifs).map((el) => order.tarifs[`${el}`])
    if (!order?.date) {
      park.setAlertMessage('Выберите дату посещения')
      park.setAlertStatus(206)
      park.setVisible(true)
      return
    }
    if (!order?.tarifs) {
      park.setAlertMessage('Выберите тариф')
      park.setAlertStatus(206)
      park.setVisible(true)
      return
    }
    if (order?.tarifs[TarifId[0].tarif.id].counter < 1) {
      park.setAlertMessage('Купите билеты')
      park.setAlertStatus(206)
      park.setVisible(true)
      return
    }
    setOrder({ ...order, customer })
    setTotal(true)
    let tsumm = summ
    TarifId.map((element) => {
      return (tsumm += element.tarif?.cost * element?.counter)
    })
    setSumm(tsumm)
  }

  const newTicket = async () => {
    const data = await createTicket(order).then((data) => {
      park.setAlertMessage(data.data.message)
      park.setAlertStatus(data.status)
      if (data.status !== 200) park.setVisible(true)
      return data
    })
    return data
  }

  return (
    <Container className="contr">
      {park.Isloading ? (
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', top: '50%', marginTop: '60px' }}>
          <Spinner animation={'border'} className={'text-light'} style={{ position: 'relative' }} />
        </div>
      ) : (
        <div>
          {total ? (
            <Container fluid style={{ marginTop: '60px' }}>
              <div className="heading1">Итог</div>
              <Row style={{ marginBottom: '60px' }}>
                <Row>
                  <Col>
                    <div className="description">Фамилия</div>

                    <div className="description">Имя</div>
                    <div className="description">Почта</div>
                    <div className="description">Номер телефона</div>
                    <div className="description">Билеты</div>
                  </Col>
                  <Col>
                    <div className="description">{order.customer?.surname}</div>
                    <div className="description">{order.customer?.name}</div>
                    <div className="description">{order.customer?.email}</div>
                    <div className="description">{order.customer?.phone_number}</div>
                    <div>
                      {Object.getOwnPropertyNames(order.tarifs).map((el, index) => (
                        <div className="description" key={el[index]}>
                          {order.tarifs[`${el}`].tarif?.name}
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <div className="description">Сумма: </div>
                  </Col>
                  <Col>
                    <div className="description">{summ}</div>
                  </Col>
                </Row>
              </Row>
              <Button className="button2" onClick={() => setTotal(false)}>
                Назад
              </Button>
              <Button
                className="button2"
                onClick={() => {
                  newTicket(order)
                    .then(() => lk())
                    .finally(() => navigate(CUSTOMER_ROUTE + TICKETS_ROUTE))
                }}
              >
                Подтвердить покупку
              </Button>
            </Container>
          ) : (
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
                    className="heading3_2 text-center"
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
                    className="heading3_2 text-center active-page"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id + PARK_TARIF_ROUTE)}
                  >
                    Купить билет
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="mt-5 text-center">
                  <CalendarStore value={order?.date} onChange={(date) => setOrder({ ...order, date })} />
                </Col>
                <Col>
                  {tarifs.length !== 0 ? (
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
                    ))
                  ) : (
                    <div className="description text-center mt-5">В этом парке пока нет билетов</div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="mt-5">
                  <OrderForm createOrder={createOrder}></OrderForm>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      )}
    </Container>
  )
}

export default ParkTarif
