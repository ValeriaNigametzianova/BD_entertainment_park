import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {
  stuffFetchPark,
  createTarif,
  editTarif,
  stuffFetchOneTarif,
} from '../http/parkAPI'
import { STUFF_ROUTE, TARIF_ADMIN_ROUTE } from '../utils/Consts'

const EditingParkTarif = () => {
  const [tarif, setTarif] = useState({})
  const { id } = useParams()

  useEffect(() => {
    stuffFetchOneTarif(id).then((data) => {
      const tarif = data.tarif
      stuffFetchPark().then((data) => {
        data.parks.map((data) => {
          let park = data.park
          setTarif({ ...tarif, ParkId: park.id })
        })
      })
    })
  }, [])
  const navigate = useNavigate()

  const updateTarif = () => {
    editTarif(tarif).then((data) => {})
  }
  const newTarif = () => {
    createTarif(tarif).then((data) => {})
  }

  return (
    <Container className={'d-flex justify-content-center text-light'}>
      <Col xs={6}>
        <Form>
          <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
            {tarif?.id ? (
              <Form.Label style={{ color: 'green' }}>
                Редактировать информацию о тарифах
              </Form.Label>
            ) : (
              <Form.Label style={{ color: 'green' }}>Создать тариф</Form.Label>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Название</Form.Label>
            <Form.Control
              placeholder="Название"
              value={tarif?.name}
              onChange={(e) => setTarif({ ...tarif, name: e.target.value })}
            />
            <Form.Label>Стоимость</Form.Label>
            <Form.Control
              placeholder="Стоимость"
              value={tarif?.cost}
              onChange={(e) =>
                setTarif({ ...tarif, cost: e.target.value.replace(/\D/, '') })
              }
            />
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={7}
              placeholder="Описание"
              value={tarif?.description}
              onChange={(e) =>
                setTarif({ ...tarif, description: e.target.value })
              }
            />
          </Form.Group>
          {tarif?.id ? (
            <Button
              variant="primary"
              onClick={() => (
                updateTarif(), navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)
              )}
            >
              Обновить
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => (
                newTarif(), navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)
              )}
            >
              Создать
            </Button>
          )}
        </Form>
      </Col>
    </Container>
  )
}

export default EditingParkTarif
