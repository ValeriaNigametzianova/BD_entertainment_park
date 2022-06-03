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
} from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  STUFF_ROUTE,
  TARIF_ADMIN_ROUTE,
} from '../utils/Consts'

const EditingParkTarif = ({ tarif }) => {
  const [park, setPark] = useState()
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
    // stuffFetchTarif(id).then((data) => setTarif(data))
  }, [])
  console.log('id', id)
  console.log('el', park)
  console.log('elll', tarif)
  const navigate = useNavigate()

  //   const tarifUp = { name, cost, description, ParkId }
  const updateTarif = () => {
    editTarif(tarif).then((data) => {})
  }
  const newTarif = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('cost', `${cost}`)
    formData.append('description', description)
    formData.append('ParkId', ParkId)
    console.log('5555555555555555555555555555')
    createTarif(name, cost, description, ParkId).then((data) => {})
  }

  //   const searchParks = useMemo(() => {
  //     return park.parks.filter((onePark) =>
  //       onePark.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   }, [searchQuery, park.parks])

  return (
    <Container className={'d-flex justify-content-center text-light'}>
      <Col xs={6}>
        {tarif && tarif.tarifs.length ? (
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>
                Редактировать информацию о тарифах
              </Form.Label>
            </Form.Group>
            {console.log('3', tarif)}
            {tarif &&
              tarif.tarifs.map((el) => (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  {console.log('el', el)}
                  <Form.Label>Название</Form.Label>
                  <Form.Control
                    placeholder="Название"
                    defaultValue={el?.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Label>Стоимость</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Стоимость"
                    defaultValue={el?.cost}
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Описание"
                    defaultValue={el?.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              ))}

            <Button
              variant="primary"
              onClick={() => (
                newTarif(), navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)
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
