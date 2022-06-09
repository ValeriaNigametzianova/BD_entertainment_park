import React, { useContext, useState } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  MAIN_ROUTE,
  PARK_MAIN_ROUTE,
  PARK_TARIF_ROUTE,
  STUFF_ROUTE,
  TICKETS_ROUTE,
} from '../utils/Consts'
import { Context } from '../index'

const TarifItem = ({ tarif }) => {
  const { user } = useContext(Context)
  const [counter, setCounter] = useState(0)
  const navigate = useNavigate()
  return (
    <Container>
      <Row
        md={4}
        // className="justify-content-md-center"
        style={{
          background: 'lightgrey',
          cursor: 'pointer',
          aligne: 'centre',
          borderRadius: '3px',
        }}
      >
        <Col md="auto">
          <Row className="mt-2 px-2" border={'light'}>
            <Row>
              <div>{tarif.name}</div>
            </Row>
            <Row>
              <div> {tarif.cost} </div>
            </Row>
            <Row>
              <div> {tarif.description} </div>
            </Row>
          </Row>
        </Col>
        <Col md="auto">
          <Row>
            {user.role === 'stuff' ? (
              <Button
                key={tarif.id}
                tarif={tarif}
                onClick={() =>
                  navigate(STUFF_ROUTE + PARK_TARIF_ROUTE + '/' + tarif.id)
                }
              >
                Обновить даннные
              </Button>
            ) : (
              <div>
                {counter ? (
                  <div>
                    <Button onClick={() => setCounter(counter - 1)}>-</Button>
                    {counter}
                    <Button onClick={() => setCounter(counter + 1)}>+</Button>
                  </div>
                ) : (
                  <Button
                    key={tarif.id}
                    tarif={tarif}
                    onClick={() => setCounter(counter + 1)}
                  >
                    Добавить
                  </Button>
                )}
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
export default TarifItem
