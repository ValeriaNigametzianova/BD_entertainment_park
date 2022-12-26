import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row, Image, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
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
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import axios from 'axios'

const EditingParkInfo = observer(() => {
  const { park } = useContext(Context)
  const params = useParams()
  const [Park, setPark] = useState()
  const [greenZones, setGreenZones] = useState(null)
  const [ParkId, setParkId] = useState(params.id)
  const [GreenZoneId, setGreenZoneId] = useState(0)
  const [files, setFiles] = useState(null)
  const navigate = useNavigate()
  const [img, setImg] = useState()
  let formData = new FormData()
  const [tempFile, setTempFile] = useState('')
  const photoInput = useRef(null)

  useEffect(() => {
    park.setIsLoading(true)
    fetchData().then(() => {
      // setImg(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
      // setTempFile(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
      park.setIsLoading(false)
    })
  }, [])

  const fetchData = async () => {
    const data = await Promise.all([
      stuffFetchPark().then((data) => {
        setPark(data.parks[0]?.park)
      }),
      stuffFetchGreenZone().then((data) => {
        setGreenZones(data.parks[0]?.greenZones[0])
        setGreenZoneId(data.parks[0]?.greenZones[0]?.id)
      }),
      axios
        .get(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
        .then((data) => {
          console.log('d', data)
          setImg(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
          setTempFile(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
        })
        .catch((err) => {
          console.log('e', err)
          setImg('')
          setTempFile('')
        }),
    ])
  }
  const selectFiles = (e) => {
    setFiles(e.target.files[0])
    setTempFile(URL.createObjectURL(e.target.files[0]))
  }

  const setPhoto = async (id) => {
    const fd = new FormData()
    fd.append('file', files)
    fd.append('id', id)
    await updatePhoto(fd)
  }

  const throwPhoto = () => {
    if (tempFile) {
      setTempFile(img)
      photoInput.current.value = ''
    } else setTempFile('')
    setFiles(null)
  }

  const dropPhoto = async () => {
    const fileName = `${ParkId}` + `.jpg`
    await deletePhoto(fileName)
    setImg(null)
    setTempFile('')
  }

  const newPark = async () => {
    if (Park?.name) formData.append('name', Park?.name)
    if (Park?.town) formData.append('town', Park?.town)
    if (Park?.square) formData.append('square', `${Park?.square}`)
    else formData.append('square', 0)
    if (Park?.opening_time) formData.append('opening_time', `${Park?.opening_time}`)
    else formData.append('opening_time', 0)
    if (Park?.closing_time) formData.append('closing_time', Park?.closing_time)
    else formData.append('closing_time', 0)
    if (Park?.description) formData.append('description', Park?.description)
    else formData.append('description', '')
    if (Park?.animators) formData.append('animators', `${Park?.animators}`)
    else formData.append('animators', false)
    if (Park?.watersafe) formData.append('watersafe', Park?.watersafe)
    else formData.append('watersafe', false)
    if (Park?.zoo) formData.append('zoo', Park?.zoo)
    else formData.append('zoo', false)
    if (Park?.cafe) formData.append('cafe', `${Park?.cafe}`)
    else formData.append('cafe', 0)
    if (Park?.shops) formData.append('shops', `${Park?.shops}`)
    else formData.append('shops', 0)
    if (Park?.adress) formData.append('adress', Park?.adress)
    else formData.append('adress', '')
    console.log(formData)
    const data = await createPark(formData).then((data) => {
      park.setAlertStatus(data.status)
      park.setAlertMessage(data.message)
      if (data.status !== 200) park.setVisible(true)
      return data
    })
    return data
  }
  const updatePark = async () => {
    const fd = Object.entries(Park).reduce((fd, [k, v]) => (fd.append(k, v), fd), new FormData())
    const data = await editInfo(fd).then((data) => {
      console.log(data)
      park.setAlertStatus(data.status)
      park.setAlertMessage(data.data.message)
      park.setVisible(true)
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
          {park.isLoading ? (
            <div
              style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', top: '50%', marginTop: '60px' }}
            >
              <Spinner animation={'border'} className={'text-light'} style={{ position: 'relative' }} />
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
                {ParkId ? (
                  <Form.Label className="heading2_1 description">Редактировать информацию о парке</Form.Label>
                ) : (
                  <Form.Label className="heading2_1 description">Создать парк</Form.Label>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="heading3 description">Название</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  placeholder="Название"
                  value={Park?.name}
                  onChange={(e) => setPark({ ...Park, name: e.target.value })}
                />
                <Form.Label className="heading3 description">Город</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  placeholder="Город"
                  value={Park?.town}
                  onChange={(e) => {
                    e.stopPropagation()
                    setPark({ ...Park, town: e.target.value })
                  }}
                />
                <Form.Label className="heading3 description">Площадь</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  type="number"
                  placeholder="Площадь"
                  value={Park?.square}
                  onChange={(e) => setPark({ ...Park, square: e.target.value })}
                />
                <Form.Label className="heading3 description">Время открытия</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  type="time"
                  placeholder="Время открытия"
                  value={Park?.opening_time}
                  onChange={(e) => {
                    setPark({ ...Park, opening_time: e.target.value + ':00' })
                  }}
                />
                <Form.Label className="heading3 description">Время закрытия</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  type="time"
                  placeholder="Время закрытия"
                  value={Park?.closing_time}
                  onChange={(e) => {
                    // let time = new Date(0000, 0, 0, e.target.value.split(':')[0],  e.target.value.split(':')[1], 0)
                    setPark({ ...Park, closing_time: e.target.value + ':00' })
                  }}
                />
                <Form.Label className="heading3 description">Описание</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  as="textarea"
                  placeholder="Описание"
                  rows={7}
                  value={Park?.description}
                  onChange={(e) => setPark({ ...Park, description: e.target.value })}
                />
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4 description mb-3"
                    type={'checkbox'}
                    label={`Наличие аниматоров`}
                    checked={Park?.animators}
                    onChange={(e) => {
                      setPark({ ...Park, animators: e.target.checked })
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4 description mb-3"
                    type={'checkbox'}
                    label={`Наличие водных пространств`}
                    checked={Park?.watersafe}
                    onChange={(e) => setPark({ ...Park, watersafe: e.target.checked })}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4 description mb-3"
                    type={'checkbox'}
                    label={`Наличие уголка с животными`}
                    checked={Park?.zoo}
                    onChange={(e) => setPark({ ...Park, zoo: e.target.checked })}
                  />
                </Form.Group>

                <Form.Label className="heading3 description mb-3">Количество кафе</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  type="number"
                  placeholder="Количество кафе"
                  value={Park?.cafe}
                  onChange={(e) => setPark({ ...Park, cafe: e.target.value })}
                />

                <Form.Label className="heading3 description mb-3">Количество сувернирных лавок</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  type="number"
                  placeholder="Количество сувернирных лавок"
                  value={Park?.shops}
                  onChange={(e) => setPark({ ...Park, shops: e.target.value })}
                />

                <Form.Label className="heading3 description">Адрес</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  placeholder="Адрес"
                  value={Park?.adress}
                  onChange={(e) => setPark({ ...Park, adress: e.target.value })}
                />

                {tempFile ? (
                  <>
                    <Image className="my-5" width="100%" src={tempFile} />{' '}
                    <Row>
                      <Col>
                        <Button onClick={() => dropPhoto()}>Удалить фото</Button>
                      </Col>
                      <Col>
                        <Button onClick={() => throwPhoto()}>Сбросить</Button>
                      </Col>
                    </Row>
                  </>
                ) : null}
                <Form.Label className="heading3 description">Добавьте фото</Form.Label>
                <Form.Control
                  ref={photoInput}
                  className="heading4 mb-3"
                  type="file"
                  onChange={(e) => selectFiles(e)}
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
                              updateGreenZone()
                            } else {
                              if (greenZones) {
                                newGreenZone(data.id)
                              }
                            }
                            // setImg(process.env.REACT_APP_API_URL + `${ParkId}` + `.jpg`)
                            if (files) setPhoto(data.data.updatedPark.id)
                          })
                          .then(() => {
                            {
                              navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
                              // window.location.reload()
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
                            console.log(data)
                            if (files) setPhoto(data.park.id)
                            if (greenZones) newGreenZone(data.park.id)
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
          )}
        </Col>
      </Container>
    </Container>
  )
})

export default EditingParkInfo
