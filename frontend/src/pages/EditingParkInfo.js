import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  editInfo,
  stuffFetchGreenZone,
  stuffFetchPark,
  createPark,
  editGreenZone,
  createGreenZone,
} from '../http/parkAPI'
import { MAIN_ADMIN_ROUTE, STUFF_ROUTE } from '../utils/Consts'
import '../styles/container/container.css'
import '../styles/navBar/navbar.css'
import '../styles/fonts/fonts.css'

const EditingParkInfo = () => {
  const [park, setPark] = useState()
  const [greenZones, setGreenZones] = useState()
  const [name, setName] = useState('')
  const [town, setTown] = useState('')
  const [square, setSquare] = useState(0)
  const [opening_time, setOpTime] = useState(0)
  const [closing_time, setClTime] = useState(0)
  const [description, setDescription] = useState('')
  const [animator, setAnimator] = useState(false)
  const [watersafe, setWatersafe] = useState(false)
  const [zoo, setZoo] = useState(false)
  const [cafe, setCafe] = useState(0)
  const [shop, setShop] = useState(0)
  const [adress, setAdress] = useState('')
  const [gzName, setGzName] = useState('')
  const [gzDescription, setGzDescription] = useState('')
  const [ParkId, setParkId] = useState(0)
  const [GreenZoneId, setGreenZoneId] = useState(0)
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    stuffFetchPark().then((data) => {
      setPark(data.parks[0]?.park)
      setParkId(data.parks[0]?.park.id)
      console.log(data.parks[0]?.park)
    })
    stuffFetchGreenZone().then((data) => {
      setGreenZones(data.parks[0]?.greenZones[0])
    })
  }, [])

  const updatePark = async () => {
    let onePark = park
    await editInfo(onePark)
  }
  const newPark = async () => {
    let onePark = park
    const data = await createPark(onePark).then((data) => {
      return data
    })
    return data
  }

  const newGreenZone = async (id) => {
    let greenZone = greenZones
    await createGreenZone(greenZone, id)
  }
  const updateGreenZone = async () => {
    let greenZone = greenZones
    await editGreenZone(greenZone)
  }

  return (
    <Container className="contr">
      <Container className={'d-flex justify-content-center text-light'}>
        <Col>
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              {ParkId ? (
                <Form.Label className="heading2_1 description">Редактировать информацию о парке</Form.Label>
              ) : (
                <Form.Label className="heading2_1" style={{ color: '#151E20' }}>
                  Создать парк
                </Form.Label>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="heading3 description">Название</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                placeholder="Название"
                value={park?.name}
                onChange={(e) => setPark({ ...park, name: e.target.value })}
              />
              <Form.Label className="heading3 description">Город</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                placeholder="Город"
                value={park?.town}
                onChange={(e) => {
                  e.stopPropagation()
                  setPark({ ...park, town: e.target.value })
                }}
              />
              <Form.Label className="heading3 description">Площадь</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="number"
                placeholder="Площадь"
                value={park?.square}
                onChange={(e) => setPark({ ...park, square: e.target.value })}
              />
              <Form.Label className="heading3 description">Время открытия</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                placeholder="Время открытия"
                value={park?.opening_time}
                onChange={(e) => setPark({ ...park, opening_time: e.target.value })}
              />
              <Form.Label className="heading3 description">Время закрытия</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="dateTime"
                placeholder="Время закрытия"
                value={park?.closing_time}
                onChange={(e) => setPark({ ...park, closing_time: e.target.value })}
              />
              <Form.Label className="heading3 description">Описание</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                as="textarea"
                placeholder="Описание"
                rows={7}
                value={park?.description}
                onChange={(e) => setPark({ ...park, description: e.target.value })}
              />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  className="heading4 description mb-3"
                  type={'checkbox'}
                  label={`Наличие аниматоров`}
                  checked={park?.animators}
                  onChange={(e) => setPark({ ...park, animators: e.target.checked })}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  className="heading4 description mb-3"
                  type={'checkbox'}
                  label={`Наличие водных пространств`}
                  checked={park?.watersafe}
                  onChange={(e) => setPark({ ...park, watersafe: e.target.checked })}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  className="heading4 description mb-3"
                  type={'checkbox'}
                  label={`Наличие уголка с животными`}
                  checked={park?.zoo}
                  onChange={(e) => setPark({ ...park, zoo: e.target.checked })}
                />
              </Form.Group>

              <Form.Label className="heading3 description mb-3">Количество кафе</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="number"
                placeholder="Количество кафе"
                value={park?.cafe}
                onChange={(e) => setPark({ ...park, cafe: e.target.value })}
              />

              <Form.Label className="heading3 description mb-3">Количество сувернирных лавок</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="number"
                placeholder="Количество сувернирных лавок"
                value={park?.shops}
                onChange={(e) => setPark({ ...park, shops: e.target.value })}
              />

              <Form.Label className="heading3 description">Адрес</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                placeholder="Адрес"
                value={park?.adress}
                onChange={(e) => setPark({ ...park, adress: e.target.value })}
              />

              <Form.Label className="heading3 description">Добавьте фото</Form.Label>
              <Form.Control className="heading4 mb-3" type="file" onChange={selectFile} />
            </Form.Group>

            <Form.Group className="mt-5 fs-3" controlId="formBasicEmail">
              <Form.Label className="heading2_1 description">Зоны для отдыха и прогулок</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="heading3 description">Название</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                placeholder="Название"
                value={greenZones?.name}
                onChange={(e) => setGreenZones({ ...greenZones, name: e.target.value })}
              ></Form.Control>

              <Form.Label className="heading3 description">Описание</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                as="textarea"
                rows={7}
                placeholder="Описание"
                value={greenZones?.description}
                onChange={(e) => setGreenZones({ ...greenZones, description: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col>
                <Button
                  className="button2"
                  variant="primary"
                  onClick={async () => {
                    navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
                  }}
                >
                  Назад
                </Button>
              </Col>
              <Col>
                {ParkId ? (
                  <Button
                    className="button-green"
                    variant="primary"
                    onClick={async () => {
                      updatePark()
                        .then(() => updateGreenZone())
                        .then(() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE))
                    }}
                  >
                    Обновить
                  </Button>
                ) : (
                  <Button
                    className="button2"
                    variant="primary"
                    onClick={() => {
                      newPark()
                        .then((data) => {
                          console.log(data)
                          newGreenZone(data.id)
                        })
                        .then(() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE))
                    }}
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

export default EditingParkInfo
