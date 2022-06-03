import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import TarifList from '../components/TarifList'
import { stuffFetchPark, stuffFetchTarif } from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_INFO_ROUTE,
  PARK_MAIN_ROUTE,
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
    stuffFetchTarif().then((data) => setTarif(data))
  }, [])
  console.log('777', tarif)
  const navigate = useNavigate()
  return (
      <Container className='contr'>
    <Container md={9}>
      <Row mt-5 className='heading2_1'>
      <h2 style={{ color: '#151E20' }}>Тариф</h2>
    </Row>
      <Row className="d-flex justify-content-between">
        <Col>
          <div
              className='heading3_2'
            style={{ textAlign:"left", cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)}
          >
            О парке
          </div>
        </Col>
        <Col >
          <div
              className='heading3_2'
            style={{ textAlign:"center", cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)}
          >
            Аттракционы
          </div>
        </Col>
        <Col >
          <div
              className='heading3_2'
            style={{ textAlign:"right", cursor: 'pointer' }}
            onClick={() => navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)}
          >
            Тарифы
          </div>
        </Col>
      </Row>

      <Row>
        {tarif &&
          tarif.tarifs.map((el) =>
            el.map((el) => (
              <Col>
                <Row>
                  <div style={{ color: 'white' }}>Название: "{el?.name}</div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>Стоимость: {el?.cost}</div>
                </Row>
                <Row>
                  <div style={{ color: 'white' }}>
                    Описание: {el?.description}
                  </div>
                </Row>
              </Col>
            ))
          )}
      </Row>
    </Container>
      </Container>
  )
}

export default ParkTarifForAdmin
