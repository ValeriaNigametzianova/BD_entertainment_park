import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { customerFetchPDF, customerFetchTickets } from '../http/customerAPI'

const Tickets = () => {
  const [tickets, setTickets] = useState([])
  const baseLink = 'result'
  const format = '.pdf'
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    fetchData().finally(() => {
      setIsLoading(false)
    })
  }, [])

  const fetchData = async () => {
    const data1 = await customerFetchPDF()
    console.log(Date.now())
    await axios
      .get('http://localhost:8000/result13.pdf')
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
    const data = await customerFetchTickets()
    console.log(2, data)
    setTickets(data)
  }

  return (
    <Container>
      <Row>
        <div className="heading1 description">Ваши билеты: </div>
      </Row>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="border text-light mt-5" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      ) : (
        <div>
          {tickets.map((el) => (
            <Container fluid className="d-flex justify-content-center" key={el?.id}>
              <iframe
                title={`${el?.id}` + format + '#toolbar=0'}
                src={process.env.REACT_APP_API_URL + baseLink + `${el?.id}` + format + '#toolbar=0'}
                type="application/pdf"
                width="600"
                height="800"
              ></iframe>
            </Container>
          ))}
        </div>
      )}
    </Container>
  )
}

export default Tickets
