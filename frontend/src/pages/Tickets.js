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

  return (
    <Container>
      <Row>
        <div>Ваши билеты: </div>
      </Row>
      {tickets.map((el) => (
        <Container fluid className="d-flex justify-content-center">
          <iframe
            src={
              process.env.REACT_APP_API_URL +
              baseLink +
              `${el?.id}` +
              format +
              '#toolbar=0'
            }
            type="application/pdf"
            width="600"
            height="400"
          ></iframe>
        </Container>
        /* <Button onClick={() => saveAs(el, 'newPdf.pdf')}>Скачать</Button>  */
      ))}
    </Container>
  )
}

export default Tickets
