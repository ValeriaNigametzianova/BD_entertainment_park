import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import TarifList from '../components/TarifList'
import { stuffFetchPark } from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  PARK_TARIF_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'
import 'bootstrap/dist/css/bootstrap.min.css'

const ParkTarifForAdmin = () => {
  const [park, setPark] = useState()
  const [tarif, setTarif] = useState()
  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data.park))
  }, [])
  const navigate = useNavigate()
  return (
    <Container className="contr">
      <Container md={9}>
        <Row className="d-flex">
          <Col>
            <div
              className="heading3_2"
              style={{ textAlign: 'left', cursor: 'pointer' }}
              onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
            >
              Парк
            </div>
          </Col>
          <Col>
            <div
              className="heading3_2"
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
        <TarifList></TarifList>
        {/* <Row>
        {tarif &&
          tarif.tarifs.map((el) =>
            el.map((el) => (
              <Col>
                <Row className="heading4">
                  <div>Название: "{el?.name}"</div>
                </Row>
                <Row className="heading4">
                  <div>Стоимость: {el?.cost} р</div>
                </Row>
                <Row className="heading4">
                  <div>Описание: {el?.description}</div>
                </Row>
                {console.log('el', el)}
                <Button
                  key={el.id}
                  tarif={el}
                  onClick={() => navigate(STUFF_ROUTE + PARK_TARIF_ROUTE)}
                >
                  Обновить даннные
                </Button>
              </Col>
            ))
          )}
      </Row> */}
        <Row>
          {tarif && tarif.tarifs.lenght ? (
            {}
          ) : (
            <Button
              className="button2"
              onClick={() => navigate(STUFF_ROUTE + PARK_TARIF_ROUTE)}
            >
              Создать тариф
            </Button>
          )}
        </Row>
      </Container>
    </Container>
  )
}

export default ParkTarifForAdmin
