import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { stuffFetchPark } from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navBar/navbar.css'
import '../styles/container/container.css'
import '../styles/fonts/fonts.css'
import '../styles/button/button.css'
import AttractionList from '../components/AttractionList'

const ParkAttractionsForAdmin = () => {
  const [park, setPark] = useState()
  const [attractions, setAttractions] = useState()
  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data.parks))
  }, [])
  const navigate = useNavigate()
  return (
    <Container className="contr">
      <Container md={9}>
        <Row className="d-flex justify-content-between">
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'left', cursor: 'pointer' }}
              onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
            >
              О парке
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2 active-page"
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)}
            >
              Аттракционы
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'right', cursor: 'pointer' }}
              onClick={() => navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)}
            >
              Тарифы
            </div>
          </Col>
        </Row>
        <Row>
          {attractions && attractions.attractions.lenght ? (
            {}
          ) : (
            <Button
              className="button2 my-3"
              onClick={() => navigate(STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE)}
            >
              Создать аттракцион
            </Button>
          )}
        </Row>
        <AttractionList></AttractionList>
      </Container>
    </Container>
  )
}

export default ParkAttractionsForAdmin
