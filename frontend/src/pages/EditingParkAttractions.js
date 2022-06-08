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
  stuffFetchOneAttraction,
} from '../http/parkAPI'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  MAIN_ADMIN_ROUTE,
  STUFF_ROUTE,
} from '../utils/Consts'
import '../styles/navBar/navbar.css'

const EditingParkAttractions = () => {
  const [park, setPark] = useState()
  const [attraction, setAttraction] = useState()
  const [name, setName] = useState()
  const [hight, setHight] = useState()
  const [weight_limitation, setWLim] = useState()
  const [hight_limitation, setHLim] = useState()
  const [description, setDescription] = useState()
  const [age_limitation, setALim] = useState()
  const [max_quantity_people, setMaxQuan] = useState()
  const [active, setActive] = useState()
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
    stuffFetchOneAttraction(id).then((data) => {
      setAttraction(data.attraсtion)
      if (!data.attraction.age_limitation) {
        setALim(20)
      }
    })
  }, [])
  console.log('el', park)
  console.log('elll', attraction)
  const navigate = useNavigate()

  const updateAttraction = () => {
    const formData = new FormData()

    formData.append('id', `${attraction.id}`)
    formData.append('name', name)
    formData.append('hight', `${hight}`)
    formData.append('weight_limitation', `${weight_limitation}`)
    formData.append('hight_limitation', `${hight_limitation}`)
    formData.append('description', description)
    formData.append('age_limitation', `${age_limitation}`)
    formData.append('max_quantity_people', `${max_quantity_people}`)
    formData.append('active', active)
    formData.append('ParkId', `${ParkId}`)
    editAttraction(formData).then((data) => {})
  }
  const newAttraction = () => {
    const formData = new FormData()
    formData.set('name', name)
    formData.append('hight', `${hight}`)
    formData.append('weight_limitation', `${weight_limitation}`)
    formData.append('hight_limitation', `${hight_limitation}`)
    formData.append('description', description)
    formData.set('age_limitation', `${age_limitation}`)
    formData.append('max_quantity_people', max_quantity_people)
    formData.append('active', active)
    formData.append('ParkId', `${ParkId}`)
    console.log('5555555555555555555555555555')
    createAttraction(
      name,
      hight,
      weight_limitation,
      hight_limitation,
      description,
      age_limitation,
      max_quantity_people,
      ParkId
    ).then((data) => {})
  }

  //   const searchParks = useMemo(() => {
  //     return park.parks.filter((onePark) =>
  //       onePark.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   }, [searchQuery, park.parks])
  const el = attraction
  return (
    <Container className={'d-flex justify-content-center text-light'}>
      <Col xs={6}>
        {attraction ? (
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>
                Редактировать информацию об аттракционе
              </Form.Label>
            </Form.Group>
            {attraction && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                {console.log('el', attraction.name)}
                <Form.Label>Название</Form.Label>
                <Form.Control
                  placeholder="Название"
                  defaultValue={attraction?.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Label>Высота аттракциона</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Высота аттракциона"
                  defaultValue={attraction?.hight}
                  value={hight}
                  onChange={(e) => setHight(e.target.value)}
                />
                <Form.Label>Ограничение по весу посетителя</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ограничение по весу посетителя"
                  defaultValue={attraction?.weight_limitation}
                  value={weight_limitation}
                  onChange={(e) => setWLim(Number(e.target.value))}
                />
                <Form.Label>Огранчиение по росту посетителя</Form.Label>
                <Form.Control
                  placeholder="Огранчиение по росту посетителя"
                  defaultValue={attraction?.hight_limitation}
                  value={hight_limitation}
                  onChange={(e) => setHLim(Number(e.target.value))}
                />
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Описание"
                  defaultValue={attraction?.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Form.Label>Ограничение по фозрасту посетителя</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ограничение по фозрасту посетителя"
                  defaultValue={attraction?.age_limitation}
                  value={age_limitation}
                  onChange={(e) => setALim(Number(e.target.value))}
                />
                <Form.Label>Максимальное количество человек</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Максимальное количество человек"
                  defaultValue={attraction?.max_quantity_people}
                  value={max_quantity_people}
                  onChange={(e) => setMaxQuan(Number(e.target.value))}
                />
                <Form.Check
                  type={'checkbox'}
                  label={`Активный?`}
                  value={active}
                  onChange={(e) => setActive(Boolean(e.target.value))}
                />
              </Form.Group>
            )}

            <Button
              className="button"
              variant="primary"
              onClick={() => (
                updateAttraction(),
                navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)
              )}
            >
              Обновить
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>
                Создать аттракцион
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* {console.log('el', el)} */}
              <Form.Label>Название</Form.Label>
              <Form.Control
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Высота аттракциона</Form.Label>
              <Form.Control
                type="number"
                placeholder="Высота аттракциона"
                value={hight}
                onChange={(e) => setHight(e.target.value)}
              />
              <Form.Label>Ограничение по весу посетителя</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ограничение по весу посетителя"
                value={weight_limitation}
                onChange={(e) => setWLim(Number(e.target.value))}
              />
              <Form.Label>Огранчиение по росту посетителя</Form.Label>
              <Form.Control
                placeholder="Огранчиение по росту посетителя"
                value={hight_limitation}
                onChange={(e) => setHLim(Number(e.target.value))}
              />
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Form.Label>Ограничение по фозрасту посетителя</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ограничение по фозрасту посетителя"
                value={age_limitation}
                onChange={(e) => setALim(Number(e.target.value))}
              />
              <Form.Label>Максимальное количество человек</Form.Label>
              <Form.Control
                type="number"
                placeholder="Максимальное количество человек"
                value={max_quantity_people}
                onChange={(e) => setMaxQuan(Number(e.target.value))}
              />
              <Form.Check
                type={'checkbox'}
                label={`Активный?`}
                value={active}
                onChange={(e) => setActive(Boolean(e.target.value))}
              />
            </Form.Group>
            <Button
              className="button"
              variant="primary"
              onClick={() => (
                newAttraction(), navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)
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

export default EditingParkAttractions
