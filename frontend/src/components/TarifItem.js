import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PARK_TARIF_ROUTE, STUFF_ROUTE } from '../utils/Consts'
import { Context } from '../index'
import { deleteTarif } from '../http/tarifAPI'

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
    <Row className="mt-9">
      <Col>
        <Row className="px-2" border={'light'}>
          <Row className="heading2 text-start">
            <div>{tarif.name}</div>
          </Row>
          <Row className="heading4">
            <div>Стоимость: {tarif.cost} </div>
          </Row>
          <Row className="heading4">
            <div>Описание: {tarif.description} </div>
          </Row>
        </Row>
      </Col>
      <Row>
        {user.role === 'stuff' ? (
          <Row className="d-flex my-5">
            <Col>
              <Button
                className="button-warning"
                onClick={() => {
                  destroyTarif(tarif)
                }}
              >
                Удалить тариф
              </Button>
            </Col>
            <Col>
              <Button
                className="button2"
                key={tarif.id}
                tarif={tarif}
                onClick={() =>
                  navigate(STUFF_ROUTE + PARK_TARIF_ROUTE + '/' + tarif.id)
                }
              >
                Обновить даннные
              </Button>
            </Col>
          </Row>
        ) : (
          <div className="mt-1 align-center justify-content-center">
            {counter === 0 ? (
              <div>
                <Button
                  className="button2"
                  key={tarif.id}
                  tarif={tarif}
                  onClick={() => setCounter(counter + 1)}
                >
                  Добавить
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  className="button2 counter"
                  onClick={() => setCounter(counter - 1)}
                >
                  -
                </Button>
                {counter}
                <Button
                  className="button2 counter"
                  onClick={() => setCounter(counter + 1)}
                >
                  +
                </Button>
              </div>
            )}
          </div>
        )}
      </Row>
    </Row>
  )
}
export default TarifItem
