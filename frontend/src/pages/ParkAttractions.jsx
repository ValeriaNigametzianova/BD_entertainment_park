import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../index'
import AttractionItem from '../components/AttractionItem'
import { customerFetchAttraction, customerFetchOnePark } from '../http/parkAPI'
import { PARK_ATTRACTIONS_ROUTE, PARK_INFO_ROUTE, PARK_MAIN_ROUTE, PARK_TARIF_ROUTE } from '../utils/Consts'
import { observer } from 'mobx-react-lite'

const ParkAttractions = observer(() => {
  const { park } = useContext(Context)
  const [attractions, setAttractions] = useState()
  const { id } = useParams()
  useEffect(() => {
    park.setIsLoading(true)
    customerFetchAttraction(id)
      .then((data) => setAttractions(data))
      .finally(() => park.setIsLoading(false))
  }, [])
  const navigate = useNavigate()
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
              className="heading3_2 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(PARK_MAIN_ROUTE + '/' + id + PARK_INFO_ROUTE)}
            >
              Характеристики
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2 text-center active-page"
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
        {park.isLoading ? (
          <Spinner animation={'border'} className={'text-light'} />
        ) : (
          <div>{attractions && attractions.map((el) => <AttractionItem attraction={el}></AttractionItem>)}</div>
        )}
      </Container>
    </Container>
  )
})

export default ParkAttractions
