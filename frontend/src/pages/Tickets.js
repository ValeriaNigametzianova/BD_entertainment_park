import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { customerFetchTickets } from '../http/customerAPI'

const Tickets = () => {
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    customerFetchTickets().then((data) => {
      setTickets(data)
      data.forEach((element) => {
        element.date = new Date(element.date)
      })
    })
  }, [])
  console.log('ticketssss', tickets)
  return (
    <Container style={{ color: 'white' }}>
      <Row>
        <div>Ваши билеты: </div>
      </Row>
      {tickets.map((el) => (
        <Row>
          <Row>
            <Col>
              <Row>Фамилия</Row>
            </Col>
            <Col>
              <Row>{el?.surname}</Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>Имя</Row>
            </Col>
            <Col>
              <Row>{el?.name}</Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>Дата</Row>
            </Col>
            <Col>
              <Row>{el?.date.toLocaleDateString()}</Row>
            </Col>
          </Row>
        </Row>
      ))}
    </Container>
  )
}

export default Tickets
