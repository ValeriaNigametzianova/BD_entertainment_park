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
  const [ParkId, setParkId] = useState(0)
  const [attraction, setAttraction] = useState()
  const [AttractionId, setAttractionId] = useState(0)
  const [name, setName] = useState('')
  const [hight, setHight] = useState(0)
  const [weight_limitation, setWLim] = useState(0)
  const [hight_limitation, setHLim] = useState(0)
  const [description, setDescription] = useState('')
  const [age_limitation, setALim] = useState(0)
  const [max_quantity_people, setMaxQuan] = useState(0)
  const [active, setActive] = useState(false)

  const { id } = useParams()
  useEffect(() => {
    stuffFetchPark().then((data) => {
      setPark(data)
      data.parks.map((data) => {
        let park = data.park
        setParkId(park.id)
      })
    })
    stuffFetchOneAttraction(id).then((data) => {
      {
        console.log('data.attraction', data.attraсtion)
        let attraction = data.attraсtion
        setAttraction(attraction)
        setAttractionId(attraction.id)
        setName(attraction.name)
        setHight(attraction.hight)
        setWLim(attraction.weight_limitation)
        setHLim(attraction.hight_limitation)
        setDescription(attraction.description)
        setMaxQuan(attraction.max_quantity_people)
        setActive(attraction.active)
      }
      if (!data.attraction.age_limitation) {
        setALim(20)
      }
    })
  }, [])
  const navigate = useNavigate()

  const updateAttraction = async () => {
    const formData = new FormData()
    formData.append('id', `${AttractionId}`)
    formData.append('name', name)
    formData.append('hight', `${hight}`)
    formData.append('weight_limitation', `${weight_limitation}`)
    formData.append('hight_limitation', `${hight_limitation}`)
    formData.append('description', description)
    formData.append('age_limitation', `${age_limitation}`)
    formData.append('max_quantity_people', `${max_quantity_people}`)
    formData.append('active', active)
    formData.append('ParkId', `${ParkId}`)
    const data = await editAttraction(formData)
    return data
  }
  const newAttraction = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('hight', `${hight}`)
    formData.append('weight_limitation', `${weight_limitation}`)
    formData.append('hight_limitation', `${hight_limitation}`)
    formData.append('description', description)
    formData.append('age_limitation', `${age_limitation}`)
    formData.append('max_quantity_people', max_quantity_people)
    formData.append('active', active)
    formData.append('ParkId', `${ParkId}`)
    const data = await createAttraction(formData)
    return data
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
        {console.log('attraction', attraction)}
        {attraction ? (
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>
                Редактировать информацию об аттракционе
              </Form.Label>
            </Form.Group>
            {attraction && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
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
                  onChange={(e) => setHLim(e.target.value.replace(/\D/, ''))}
                />
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={7}
                  placeholder="Описание"
                  defaultValue={attraction?.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Form.Label>Ограничение по возрасту посетителя</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ограничение по возрасту посетителя"
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
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type={'checkbox'}
                    label={`Активный?`}
                    chacked={active}
                    onChange={(e) => setActive(!active)}
                  />
                </Form.Group>
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
                rows={7}
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Form.Label>Ограничение по возрасту посетителя</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ограничение по возрасту посетителя"
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
                checked={active}
                onChange={(e) => setActive(!active)}
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
