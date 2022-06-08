import React from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PARK_TARIF_ROUTE, STUFF_ROUTE } from '../utils/Consts'

const TarifItem = ({ tarif }) => {
  const navigate = useNavigate()
  return (
    <Container>
      <Row
        className="mt-2 px-2"
        style={{
          background: 'lightgrey',
          cursor: 'pointer',
          aligne: 'centre',
          borderRadius: '3px',
        }}
        border={'light'}
      >
        <Row md={4}>
          <div>{tarif.name}</div>
        </Row>
        <Row md={4}>
          <div> {tarif.cost} </div>
        </Row>
        <Row md={4}>
          <div> {tarif.description} </div>
        </Row>
      </Row>
      <Button
        key={tarif.id}
        tarif={tarif}
        onClick={() =>
          navigate(STUFF_ROUTE + PARK_TARIF_ROUTE + '/' + tarif.id)
        }
      >
        Обновить даннные
      </Button>
    </Container>
  )
}
export default TarifItem
