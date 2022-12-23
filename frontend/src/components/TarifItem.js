import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PARK_TARIF_ROUTE, STUFF_ROUTE } from '../utils/Consts'
import { Context } from '../index'
import { deleteTarif } from '../http/tarifAPI'
import '../styles/Items/tarifItem/tarifItem.css'

const TarifItem = ({ tarif, addTarifs }) => {
  const { user } = useContext(Context)
  const [counter, setCounter] = useState(0)
  const navigate = useNavigate()

  const createTarifs = () => {
    let key = tarif.id
    const tarifs = {
      [key]: { tarif: tarif, counter: counter },
    }
    addTarifs(tarifs)
  }

  useEffect(() => {
    if (addTarifs !== undefined) createTarifs()
  }, [counter])

  const destroyTarif = (deletedTarif) => {
    deleteTarif(deletedTarif.id).then((data) => {})
    window.location.reload()
  }

  return (
    <Row className="mt-3 tarifItem">
      <Row className="px-2">
        <Row className="heading2 text-start">
          <div>{tarif.name}</div>
        </Row>
        <Row className="description">
          <div>Стоимость: {tarif.cost} ₽ </div>
        </Row>
        <Row className="description">
          <div>Описание: {tarif.description} </div>
        </Row>
      </Row>
      {user.role === 'stuff' ? (
        <Row className="d-flex mb-3 mt-5 align-items-center">
          <Col className="d-flex justify-content-center">
            <Button
              className="button-warning"
              onClick={() => {
                destroyTarif(tarif)
              }}
            >
              Удалить тариф
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              className="button-green"
              key={tarif.id}
              tarif={tarif}
              onClick={() => navigate(STUFF_ROUTE + PARK_TARIF_ROUTE + '/' + tarif.id)}
            >
              Обновить даннные
            </Button>
          </Col>
        </Row>
      ) : (
        <Row className="d-flex mb-3 mt-5 align-items-center">
          <Col className="d-flex justify-content-center">
            {counter === 0 ? (
              <Button className="button2 mt-2" key={tarif.id} tarif={tarif} onClick={() => setCounter(counter + 1)}>
                Добавить
              </Button>
            ) : (
              <div className="description">
                <Button className="button2 counter" onClick={() => setCounter(counter - 1)}>
                  -
                </Button>
                {counter}
                <Button className="button2 counter" onClick={() => setCounter(counter + 1)}>
                  +
                </Button>
              </div>
            )}
          </Col>
        </Row>
      )}
    </Row>
  )
}
export default TarifItem
