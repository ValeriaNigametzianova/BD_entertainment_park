import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col } from 'react-bootstrap'
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
import '../styles/cont/contr.css'
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

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }
  useEffect(() => {
    stuffFetchPark().then((data) => {
      setPark(data)
      data.parks.map((data) => {
        let park = data.park
        setParkId(park.id)
        setName(park.name)
        setTown(park.town)
        setSquare(park.square)
        setOpTime(park.opening_time)
        setClTime(park.closing_time)
        setDescription(park.description)
        setAnimator(park.animator)
        setWatersafe(park.watersafe)
        setZoo(park.zoo)
        setCafe(park.cafe)
        setShop(park.shop)
        setAdress(park.adress)
      })
    })
    stuffFetchGreenZone().then((data) => {
      setGreenZones(data)
      data.parks.map((data) => {
        let greenZone = data.greenZones[0]
        setGreenZoneId(greenZone.id)
        setGzName(greenZone.name)
        setGzDescription(greenZone.description)
      })
    })
  }, [])
  const navigate = useNavigate()
  const updatePark = async () => {
    const formData = new FormData()
    formData.append('id', ParkId)
    formData.append('name', name)
    formData.append('town', town)
    formData.append('square', `${square}`)
    formData.append('opening_time', `${opening_time}`)
    formData.append('closing_time', `${closing_time}`)
    formData.append('description', description)
    formData.append('animator', animator)
    formData.append('watersafe', watersafe)
    formData.append('zoo', zoo)
    formData.append('cafe', `${cafe}`)
    formData.append('shop', `${shop}`)
    formData.append('adress', adress)
    formData.append('img', file)
    const data = await editInfo(formData)
    return data
  }
  const newPark = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('town', town)
    formData.append('square', `${square}`)
    formData.append('opening_time', `${opening_time}`)
    formData.append('closing_time', `${closing_time}`)
    formData.append('description', description)
    formData.append('animator', animator)
    formData.append('watersafe', watersafe)
    formData.append('zoo', zoo)
    formData.append('cafe', `${cafe}`)
    formData.append('shop', `${shop}`)
    formData.append('adress', adress)
    formData.append('img', file)
    const data = await createPark(formData)
    return data
  }

  const newGreenZone = async (id) => {
    let data
    const formData = new FormData()
    formData.append('name', gzName)
    formData.append('description', gzDescription)
    formData.append('ParkId', id)
    createGreenZone(formData).then((data) => data)
    // data = await createGreenZone(name, gzDescription, ParkId)
  }

  const updateGreenZone = () => {
    const formData = new FormData()
    formData.append('id', GreenZoneId)
    formData.append('name', gzName)
    formData.append('description', gzDescription)
    formData.append('ParkId', ParkId)
    editGreenZone(formData).then((data) => data)
  }

  return (
    <Container className="contr">
      <Container className={'d-flex justify-content-center text-light'}>
        <Col style={{ color: '#151E20' }}>
          {park && park?.parks?.length ? (
            <Form>
              <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
                <Form.Label className="heading2_1" style={{ color: '#151E20' }}>
                  Редактировать информацию о парке
                </Form.Label>
              </Form.Group>
              {park.parks.map((el) => {
                el = el.park
                return (
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="heading3">Название</Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      placeholder="Название"
                      defaultValue={el?.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Label className="heading3">Город</Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      placeholder="Город"
                      defaultValue={el?.town}
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                    />
                    <Form.Label className="heading3">Площадь</Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="number"
                      placeholder="Площадь"
                      defaultValue={el?.square}
                      value={square}
                      onChange={(e) => setSquare(Number(e.target.value))}
                    />
                    <Form.Label className="heading3">Время открытия</Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      placeholder="Время открытия"
                      defaultValue={el?.opening_time}
                      value={opening_time}
                      onChange={(e) => setOpTime(Date(e.target.value))}
                    />
                    <Form.Label className="heading3">Время закрытия</Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="dateTime"
                      placeholder="Время закрытия"
                      defaultValue={el?.closing_time}
                      value={closing_time}
                      onChange={(e) => setClTime(Date(e.target.value))}
                    />
                    <Form.Label className="heading3">Описание</Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      as="textarea"
                      placeholder="Описание"
                      rows={7}
                      defaultValue={el?.description}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        className="heading4 mb-3"
                        type={'checkbox'}
                        label={`Наличие аниматоров`}
                        chacked={animator}
                        onChange={(e) => setAnimator(!animator)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        className="heading4 mb-3"
                        type={'checkbox'}
                        label={`Наличие водных пространств`}
                        chacked={watersafe}
                        onChange={(e) => setWatersafe(!watersafe)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        className="heading4 mb-3"
                        type={'checkbox'}
                        label={`Наличие уголка с животными`}
                        chacked={zoo}
                        onChange={(e) => setZoo(!zoo)}
                      />
                    </Form.Group>
                    <Form.Label className="heading3 mb-3">
                      Количество кафе
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="number"
                      placeholder="Количество кафе"
                      defaultValue={el?.cafe}
                      value={cafe}
                      onChange={(e) => setCafe(Number(e.target.value))}
                    />
                    <Form.Label className="heading3 mb-3">
                      Количество сувернирных лавок
                    </Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="number"
                      placeholder="Количество сувернирных лавок"
                      defaultValue={el?.shop}
                      value={shop}
                      onChange={(e) => setShop(Number(e.target.value))}
                    />
                    <Form.Label className="heading3">Адрес</Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      placeholder="Адрес"
                      defaultValue={el?.adress}
                      value={adress}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                    <Form.Label className="heading3">Добавьте фото</Form.Label>
                    <Form.Control
                      className="heading4 mb-3"
                      type="file"
                      onChange={selectFile}
                    />
                  </Form.Group>
                )
              })}
              <Form.Group className="mt-5 fs-3" controlId="formBasicEmail">
                <Form.Label className="heading2_1" style={{ color: '#151E20' }}>
                  Зоны для отдыха и прогулок
                </Form.Label>
              </Form.Group>
              {greenZones?.parks[0]?.greenZones?.length ? (
                greenZones.parks.map((el) =>
                  el.greenZones.map((el) => (
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      {console.log('el', el)}
                      <Form.Label className="heading3">Название</Form.Label>
                      <Form.Control
                        className="heading4 mb-3"
                        placeholder="Название"
                        defaultValue={gzName}
                        value={gzName}
                        onChange={(e) => setGzName(e.target.value)}
                      ></Form.Control>

                      <Form.Label className="heading3">Описание</Form.Label>
                      <Form.Control
                        className="heading4 mb-3"
                        as="textarea"
                        placeholder="Описание"
                        defaultValue={gzDescription}
                        value={gzDescription}
                        onChange={(e) => setGzDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  ))
                )
              ) : (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="heading3">Название</Form.Label>
                  <Form.Control
                    className="heading4"
                    placeholder="Название"
                    value={gzName}
                    onChange={(e) => setGzName(e.target.value)}
                  ></Form.Control>

                  <Form.Label className="heading3">Описание</Form.Label>
                  <Form.Control
                    className="heading4"
                    as="textarea"
                    rows={7}
                    placeholder="Описание"
                    value={gzDescription}
                    onChange={(e) => setGzDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              )}
              <Button
                className="button"
                variant="primary"
                onClick={async () => {
                  await updatePark()
                  updateGreenZone()
                  navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
                }}
              >
                Обновить
              </Button>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
                <Form.Label className="heading2_1" style={{ color: '#151E20' }}>
                  Создать парк
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="heading3">Название</Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="Название"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3">Город</Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="Город"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3">Площадь</Form.Label>
                <Form.Control
                  className="heading4"
                  type="number"
                  placeholder="Площадь"
                  value={square}
                  onChange={(e) => setSquare(Number(e.target.value))}
                ></Form.Control>

                <Form.Label className="heading3">Время открытия</Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="Время открытия"
                  value={opening_time}
                  onChange={(e) => setOpTime(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3">Время закрытия</Form.Label>
                <Form.Control
                  className="heading4"
                  type="dateTime"
                  placeholder="Время закрытия"
                  value={closing_time}
                  onChange={(e) => setClTime(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3">Описание</Form.Label>
                <Form.Control
                  className="heading4"
                  as="textarea"
                  rows={7}
                  placeholder="Описание"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4"
                    type={'checkbox'}
                    label={`Наличие аниматоров`}
                    chacked={animator}
                    onChange={(e) => setAnimator(!animator)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4"
                    type={'checkbox'}
                    label={`Наличие водных пространств`}
                    chacked={watersafe}
                    onChange={(e) => setWatersafe(!watersafe)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    className="heading4"
                    type={'checkbox'}
                    label={`Наличие уголка с животными`}
                    chacked={zoo}
                    onChange={(e) => setZoo(!zoo)}
                  />
                </Form.Group>

                <Form.Label className="heading3">Количество кафе</Form.Label>
                <Form.Control
                  className="heading4"
                  type="number"
                  placeholder="Количество кафе"
                  value={cafe}
                  onChange={(e) => setCafe(Number(e.target.value))}
                ></Form.Control>

                <Form.Label className="heading3">
                  Количество сувернирных лавок
                </Form.Label>
                <Form.Control
                  className="heading4"
                  type="number"
                  placeholder="Количество сувернирных лавок"
                  value={shop}
                  onChange={(e) => setShop(Number(e.target.value))}
                ></Form.Control>

                <Form.Label className="heading3">Адрес</Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="Адрес"
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                ></Form.Control>
                <Form.Label className="heading3">Добавьте фото</Form.Label>
                <Form.Control
                  className="heading4 mb-3"
                  type="file"
                  onChange={selectFile}
                />
              </Form.Group>

              <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
                <Form.Label className="heading2_1" style={{ color: '#151E20' }}>
                  Зоны для отдыха и прогулок
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="heading3">Название</Form.Label>
                <Form.Control
                  className="heading4"
                  placeholder="Название"
                  value={gzName}
                  onChange={(e) => setGzName(e.target.value)}
                ></Form.Control>

                <Form.Label className="heading3">Описание</Form.Label>
                <Form.Control
                  className="heading4"
                  as="textarea"
                  rows={7}
                  placeholder="Описание"
                  value={gzDescription}
                  onChange={(e) => setGzDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                className="button"
                variant="primary"
                onClick={() => {
                  newPark()
                    .then((data) => newGreenZone(data.id))
                    .then(() => navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE))
                }}
              >
                Создать
              </Button>
            </Form>
          )}
        </Col>
      </Container>
    </Container>
  )
}

export default EditingParkInfo
