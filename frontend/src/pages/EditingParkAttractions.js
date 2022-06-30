import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {
  stuffFetchPark,
  createAttraction,
  editAttraction,
  stuffFetchOneAttraction,
} from '../http/parkAPI'
import { ATTRACTIONS_ADMIN_ROUTE, STUFF_ROUTE } from '../utils/Consts'
import '../styles/navBar/navbar.css'
import '../styles/fonts/fonts.css'

const EditingParkAttractions = () => {
  const [park, setPark] = useState()
  const [ParkId, setParkId] = useState(0)
  const [attraction, setAttraction] = useState({})
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
  // useEffect(() => {
  //   stuffFetchPark().then((data) => {
  //     setPark(data)
  //     data.parks.map((data) => {
  //       let park = data.park
  //       setParkId(park.id)
  //     })
  //   })
  //   stuffFetchOneAttraction(id).then((data) => {
  //     {
  //       let attraction = data.attraсtion
  //       setAttraction(attraction)
  //       setAttractionId(attraction.id)
  //       setName(attraction.name)
  //       setHight(attraction.hight)
  //       setWLim(attraction.weight_limitation)
  //       setHLim(attraction.hight_limitation)
  //       setDescription(attraction.description)
  //       setMaxQuan(attraction.max_quantity_people)
  //       setActive(attraction.active)
  //     }
  //     if (!data.attraction.age_limitation) {
  //       setALim(20)
  //     }
  //   })
  // }, [])
  // const navigate = useNavigate()

  // const updateAttraction = async () => {
  //   const formData = new FormData()
  //   formData.append('id', `${AttractionId}`)
  //   formData.append('name', name)
  //   formData.append('hight', `${hight}`)
  //   formData.append('weight_limitation', `${weight_limitation}`)
  //   formData.append('hight_limitation', `${hight_limitation}`)
  //   formData.append('description', description)
  //   formData.append('age_limitation', `${age_limitation}`)
  //   formData.append('max_quantity_people', `${max_quantity_people}`)
  //   formData.append('active', active)
  //   formData.append('ParkId', `${ParkId}`)
  //   const data = await editAttraction(formData)
  //   return data
  // }
  // const newAttraction = async () => {
  //   const formData = new FormData()
  //   formData.append('name', name)
  //   formData.append('hight', `${hight}`)
  //   formData.append('weight_limitation', `${weight_limitation}`)
  //   formData.append('hight_limitation', `${hight_limitation}`)
  //   formData.append('description', description)
  //   formData.append('age_limitation', `${age_limitation}`)
  //   formData.append('max_quantity_people', max_quantity_people)
  //   formData.append('active', active)
  //   formData.append('ParkId', `${ParkId}`)
  //   const data = await createAttraction(formData)
  //   return data
  // }

  useEffect(() => {
    stuffFetchOneAttraction(id).then((data) => {
      const attraction = data.attraсtion
      stuffFetchPark().then((data) => {
        data.parks.map((data) => {
          let park = data.park
          setAttraction({ ...attraction, ParkId: park.id })
          console.log(attraction)
        })
      })
    })
  }, [])

  // useEffect(() => {
  //   stuffFetchOneAttraction(id).then((data) => {
  //     setAttraction(data)
  //   })
  // }, [])

  const navigate = useNavigate()
  const updateAttraction = () => {
    editAttraction(attraction).then((data) => {})
  }
  const newAttraction = () => {
    createAttraction(attraction).then((data) => {})
  }

  return (
    <Container className="contr">
      <Container className={'d-flex justify-content-center text-light'}>
        <Col>
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              {attraction?.id ? (
                <Form.Label className="heading2_1 description">
                  Редактировать информацию об аттракционе
                </Form.Label>
              ) : (
                <Form.Label className="heading2_1 description">
                  Создать аттракцион
                </Form.Label>
              )}
            </Form.Group>
            {/* {attraction && ( */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="heading3 description">Название</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                placeholder="Название"
                value={attraction?.name}
                onChange={(e) =>
                  setAttraction({ ...attraction, name: e.target.value })
                }
              />

              <Form.Label className="heading3 description">
                Высота аттракциона
              </Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="number"
                placeholder="Высота аттракциона"
                defaultValue={attraction?.hight}
                value={attraction?.hight}
                onChange={(e) =>
                  setAttraction({
                    ...attraction,
                    hight: e.target.value.replace(/\D/, ''),
                  })
                }
              />

              <Form.Label className="heading3 description">
                Ограничение по весу посетителя
              </Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="number"
                placeholder="Ограничение по весу посетителя"
                defaultValue={attraction?.weight_limitation}
                value={attraction?.weight_limitation}
                onChange={(e) =>
                  setAttraction({
                    ...attraction,
                    weight_limitation: e.target.value.replace(/\D/, ''),
                  })
                }
              />

              <Form.Label className="heading3 description">
                Огранчиение по росту посетителя
              </Form.Label>
              <Form.Control
                className="heading4 mb-3"
                placeholder="Огранчиение по росту посетителя"
                defaultValue={attraction?.hight_limitation}
                value={attraction?.hight_limitation}
                onChange={(e) =>
                  setAttraction({
                    ...attraction,
                    hight_limitation: e.target.value.replace(/\D/, ''),
                  })
                }
              />

              <Form.Label className="heading3">Описание</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                as="textarea"
                rows={7}
                placeholder="Описание"
                value={attraction?.description}
                onChange={(e) =>
                  setAttraction({
                    ...attraction,
                    description: e.target.value,
                  })
                }
              />

              <Form.Label className="heading3">
                Ограничение по возрасту посетителя
              </Form.Label>
              <Form.Control
                className="heading4  mb-3"
                type="number"
                placeholder="Ограничение по возрасту посетителя"
                defaultValue={attraction?.age_limitation}
                value={attraction?.age_limitation}
                onChange={(e) =>
                  setAttraction({
                    ...attraction,
                    age_limitation: e.target.value.replace(/\D/, ''),
                  })
                }
              />

              <Form.Label className="heading3 description">
                Максимальное количество человек
              </Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="number"
                placeholder="Максимальное количество человек"
                defaultValue={attraction?.max_quantity_people}
                value={attraction?.max_quantity_people}
                onChange={(e) =>
                  setAttraction({
                    ...attraction,
                    max_quantity_people: e.target.value.replace(/\D/, ''),
                  })
                }
              />

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  className="heading3 description"
                  type={'checkbox'}
                  label={`Активный?`}
                  chacked={attraction?.active}
                  onChange={(e) =>
                    setAttraction({
                      ...attraction,
                      active: !attraction?.active,
                    })
                  }
                />
              </Form.Group>
            </Form.Group>
            {/* )} */}
            <Row>
              <Col>
                <Button
                  className="button2"
                  variant="primary"
                  onClick={() =>
                    navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)
                  }
                >
                  Назад
                </Button>
              </Col>
              <Col>
                {attraction?.id ? (
                  <Button
                    className="button-green"
                    variant="primary"
                    onClick={() => (
                      updateAttraction(),
                      navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE),
                      window.location.reload()
                    )}
                  >
                    Обновить
                  </Button>
                ) : (
                  <Button
                    className="button-green"
                    variant="primary"
                    onClick={() => (
                      newAttraction(),
                      navigate(STUFF_ROUTE + ATTRACTIONS_ADMIN_ROUTE)
                    )}
                  >
                    Создать
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
    </Container>
  )
}

export default EditingParkAttractions
