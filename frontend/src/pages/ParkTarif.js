import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
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

const ParkTarifs = () => {
  // const [park, setPark] = useState()
  const { user } = useContext(Context)
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
    return data
  }

  useEffect(() => {
    // customerFetchOnePark(id).then((data) => setPark(data))
    customerFetchTarif(id).then((data) => setTarifs(data))
  }, [id])
  const navigate = useNavigate()

  const createOrder = (customer) => {
    if (!order?.date || !order?.tarifs) return console.log('not work')
    setOrder({ ...order, customer })
    setTotal(true)
    let TarifId = Object.getOwnPropertyNames(order.tarifs).map((el) => order.tarifs[`${el}`])
    let tsumm = summ
    TarifId.map((element) => {
      return (tsumm += element.tarif?.cost * element?.counter)
    })
    setSumm(tsumm)
  }

  const newTicket = async () => {
    const data = await createTicket(order)
    return data
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
        <Container className="contr">
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
                    {Object.getOwnPropertyNames(order.tarifs).map((el) => (
                      <div className="description">{order.tarifs[`${el}`].tarif?.name}</div>
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
        </Container>
      ) : (
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
                {console.log(tarifs)}
                {tarifs ? (
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
        </Container>
      )}
    </div>
  )
}

export default ParkTarifs
