import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { customerFetchPDF, customerFetchTickets } from '../http/customerAPI'
import { saveAs } from 'file-saver'

const Tickets = () => {
  const [tickets, setTickets] = useState([])
  const baseLink = 'result'
  console.log('baseLink', baseLink)
  let link = ''
  const format = '.pdf'
  useEffect(() => {
    customerFetchPDF()
    customerFetchTickets().then((data) => setTickets(data))
  }, [])
  console.log('ticketssss', tickets)

  return (
    <Container style={{ color: 'white' }}>
      <Row>
        <div>Ваши билеты: </div>
      </Row>
      {tickets.map((el) => (
        <Row>
          <Col>
            <Row>
              <object>
                <embed
                  src={
                    process.env.REACT_APP_API_URL +
                    baseLink +
                    `${el?.id}` +
                    format
                  }
                  type="application/pdf"
                  width="700"
                  height="500"
                />
              </object>
            </Row>
          </Col>
          {/* <Button onClick={() => saveAs(el, 'newPdf.pdf')}>Скачать</Button> */}
        </Row>
      ))}
    </Container>
  )
}

export default Tickets
