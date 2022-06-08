import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Form, FormControl, Button, Container, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '..'
import {
  editInfo,
  stuffFetchGreenZone,
  stuffFetchPark,
  createPark,
  editGreenZone,
  createGreenZone,
  stuffFetchAttraction,
  createAttraction,
  editAttraction,
  createTarif,
  editTarif,
  stuffFetchTarif,
  stuffFetchOneTarif,
} from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'

const EditingParkTarif = () => {
  const [park, setPark] = useState()
  const [tarif, setTarif] = useState()
  const [name, setName] = useState()
  const [cost, setCost] = useState()
  const [description, setDescription] = useState()
  let ParkId = ''
  park &&
    park.parks.map((el) => {
      el = el.park
      ParkId = el.id
      console.log('ParkId', ParkId)
    })

  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data))
    stuffFetchOneTarif(id).then((data) => setTarif(data.tarif))
  }, [])
  console.log('id', id)
  console.log('el', park)
  console.log('elll', tarif)
  const navigate = useNavigate()

  const updateTarif = () => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', name)
    formData.append('cost', `${cost}`)
    formData.append('description', description)
    formData.append('ParkId', ParkId)
    editTarif(formData).then((data) => {})
    console.log('(formData)', formData)
  }
  const newTarif = () => {
    const formData = new FormData()
    formData.set('name', name)
    formData.append('cost', `${cost}`)
    formData.append('description', description)
    formData.append('ParkId', `${ParkId}`)
    createTarif(name, cost, description, ParkId).then((data) => {})
    console.log(formData)
  }

  return (
    <Container className={'d-flex justify-content-center text-light'}>
      <Col xs={6}>
        {tarif ? (
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>
                Редактировать информацию о тарифах
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Название</Form.Label>
              <Form.Control
                placeholder="Название"
                defaultValue={tarif?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Стоимость</Form.Label>
              <Form.Control
                type="number"
                placeholder="Стоимость"
                defaultValue={tarif?.cost}
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Описание"
                defaultValue={tarif?.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => (
                updateTarif(), navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)
              )}
            >
              Обновить
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>Создать тариф</Form.Label>
            </Form.Group>
            {console.log('6', tarif)}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Название</Form.Label>
              <Form.Control
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Form.Label>Стоимость</Form.Label>
              <Form.Control
                type="number"
                placeholder="Стоимость"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => (
                newTarif(), navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)
              )}
            >
              Создать
            </Button>
          </Form>
        )}
      </Col>
    </Container>
  )
}

export default EditingParkTarif
