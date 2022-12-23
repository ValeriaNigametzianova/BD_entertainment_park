import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  editInfo,
  stuffFetchGreenZone,
  stuffFetchPark,
  createPark,
  editGreenZone,
  createGreenZone,
  deletePhoto,
  updatePhoto,
} from '../http/parkAPI'
import { MAIN_ADMIN_ROUTE, STUFF_ROUTE } from '../utils/Consts'
import '../styles/container/container.css'
import '../styles/navBar/navbar.css'
import '../styles/fonts/fonts.css'

const EditingParkInfo = () => {
  const [park, setPark] = useState()
  const [greenZones, setGreenZones] = useState(null)
  const [ParkId, setParkId] = useState(0)
  const [GreenZoneId, setGreenZoneId] = useState(0)
  const [files, setFiles] = useState(null)
  const navigate = useNavigate()
  const [img, setImg] = useState()
  let formData = new FormData()

  useEffect(() => {
    stuffFetchPark().then((data) => {
      setPark(data.parks[0]?.park)
      setParkId(data.parks[0]?.park.id)
      setImg(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
    })
    stuffFetchGreenZone().then((data) => {
      setGreenZones(data.parks[0]?.greenZones[0])
      setGreenZoneId(data.parks[0]?.greenZones[0]?.id)
    })
  }, [img])

  // useEffect(() => {
  //   setImg(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
  // },[])
  const selectFiles = (e) => {
    setFiles(e.target.files[0])
  }

  const setPhoto = async (id) => {
    const fd = new FormData()
    fd.append('file', files)
    fd.append('id', id)
    await updatePhoto(fd)
  }
  const dropPhoto = async () => {
    const fileName = `${ParkId}` + `.jpg`
    await deletePhoto(fileName)
    setImg(null)
  }

  const newPark = async () => {
    if (park?.name) formData.append('name', park?.name)
    if (park?.town) formData.append('town', park?.town)
    if (park?.square) formData.append('square', `${park?.square}`)
    else formData.append('square', 0)
    if (park?.opening_time) formData.append('opening_time', `${park?.opening_time}`)
    else formData.append('opening_time', 0)
    if (park?.closing_time) formData.append('closing_time', park?.closing_time)
    else formData.append('closing_time', 0)
    if (park?.description) formData.append('description', park?.description)
    else formData.append('description', '')
    if (park?.animators) formData.append('animators', `${park?.animators}`)
    else formData.append('animators', false)
    if (park?.watersafe) formData.append('watersafe', park?.watersafe)
    else formData.append('watersafe', false)
    if (park?.zoo) formData.append('zoo', park?.zoo)
    else formData.append('zoo', false)
    if (park?.cafe) formData.append('cafe', `${park?.cafe}`)
    else formData.append('cafe', 0)
    if (park?.shops) formData.append('shop', `${park?.shops}`)
    else formData.append('shops', 0)
    if (park?.adress) formData.append('adress', park?.adress)
    else formData.append('adress', '')
    const data = await createPark(formData).then((data) => {
      return data
    })
    return data
  }
  const updatePark = async () => {
    const fd = Object.entries(park).reduce((fd, [k, v]) => (fd.append(k, v), fd), new FormData())
    // fd.append('file', files)
    const data = await editInfo(fd).then((data) => {
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
                type="time"
                step="300"
                required
                placeholder="Время открытия"
                value={park?.opening_time}
                onChange={(e) => {
                  setPark({ ...park, opening_time: e.target.value + ':00' })
                }}
              />
              <Form.Label className="heading3 description">Время закрытия</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="time"
                step="300"
                required
                placeholder="Время закрытия"
                value={park?.closing_time}
                onChange={(e) => {
                  // let time = new Date(0000, 0, 0, e.target.value.split(':')[0],  e.target.value.split(':')[1], 0)
                  setPark({ ...park, closing_time: e.target.value + ':00' })
                }}
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
              <Image className="my-5" width="100%" src={process.env.REACT_APP_API_URL + `${park?.id}` + `.jpg`} />
              <Button onClick={() => dropPhoto()}>Удалить фото</Button>
              <Form.Label className="heading3 description">Добавьте фото</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                type="file"
                onChange={selectFiles}
                accept="image/*, .png, .jpg, .gif, .web"
              />
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
                    onClick={() => {
                      updatePark()
                        .then((data) => {
                          if (GreenZoneId) {
                            console.log('1', greenZones)
                            updateGreenZone()
                          } else {
                            if (greenZones) {
                              console.log('2', greenZones)
                              newGreenZone(data.id)
                            }
                          }
                          setImg(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
                          if (files) setPhoto(data.id)
                        })
                        .then(() => {
                          {
                            navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
                            window.location.reload()
                          }
                        })
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
                          if (files) setPhoto(data.id)
                          if (greenZones) newGreenZone(data.id)
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
