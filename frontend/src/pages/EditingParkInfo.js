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
} from '../http/parkAPI'
import { MAIN_ADMIN_ROUTE, STUFF_ROUTE } from '../utils/Consts'

const EditingParkInfo = () => {
  const [park, setPark] = useState()
  const [greenZones, setGreenZones] = useState()
  const [name, setName] = useState()
  const [town, setTown] = useState()
  const [square, setSquare] = useState()
  const [opening_time, setOpTime] = useState()
  const [closing_time, setClTime] = useState()
  const [description, setDescription] = useState()
  const [animator, setAnimator] = useState()
  const [watersafe, setWatersafe] = useState()
  const [zoo, setZoo] = useState()
  const [cafe, setCafe] = useState(0)
  const [shop, setShop] = useState(0)
  const [adress, setAdress] = useState()
  const [gzName, setGzName] = useState()
  const [gzDescription, setGzDescription] = useState()
  let ParkId = ''

  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data))
    stuffFetchGreenZone().then((data) => setGreenZones(data))
  }, [])
  console.log('el', park)
  console.log('elll', greenZones)
  const navigate = useNavigate()
  park &&
    park.parks.map((el) => {
      el = el.park
      ParkId = el.id
      console.log('ParkId', ParkId)
    })

  const updatePark = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('town', town)
    formData.append('square', `${square}`)
    formData.append('opening_time', opening_time)
    formData.append('closing_time', closing_time)
    formData.append('description', description)
    formData.append('animator', animator)
    formData.append('watersafe', watersafe)
    formData.append('zoo', zoo)
    formData.append('cafe', `${cafe}`)
    formData.append('shop', `${shop}`)
    formData.append('adress', adress)
    // formData.append('name', gzName)
    // formData.append('description', gzDescription)
    editInfo(formData).then((data) => {})
  }
  const newPark = async () => {
    let data
    const formData = new FormData()
    formData.append('name', name)
    formData.append('town', town)
    formData.append('square', `${square}`)
    formData.append('opening_time', opening_time)
    formData.append('closing_time', closing_time)
    formData.append('description', description)
    formData.append('animator', animator)
    formData.append('watersafe', watersafe)
    formData.append('zoo', zoo)
    formData.append('cafe', `${cafe}`)
    formData.append('shop', `${shop}`)
    formData.append('adress', adress)
    formData.append('name', gzName)
    formData.append('description', gzDescription)
    createPark(formData).then((data) => {})
    // data = await createPark(
    //   name,
    //   town,
    //   square,
    //   opening_time,
    //   closing_time,
    //   description,
    //   animator,
    //   watersafe,
    //   zoo,
    //   cafe,
    //   shop,
    //   adress
    // )
  }

  const newGreenZone = async () => {
    let data
    const formData = new FormData()
    formData.append('name', gzName)
    formData.append('description', gzDescription)
    createGreenZone(formData)
    // data = await createGreenZone(name, gzDescription, ParkId)
  }

  const updateGreenZone = () => {
    const formData = new FormData()
    formData.append('name', gzName)
    formData.append('description', gzDescription)
    editGreenZone(formData)
  }

  //   const searchParks = useMemo(() => {
  //     return park.parks.filter((onePark) =>
  //       onePark.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   }, [searchQuery, park.parks])

  return (
    <Container className={'d-flex justify-content-center text-light'}>
      <Col xs={6}>
        {park && park.parks.length ? (
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>
                Редактировать информацию о парке
              </Form.Label>
            </Form.Group>
            {park &&
              park.parks.map((el) => {
                el = el.park
                return (
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    {console.log('el', el)}
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                      placeholder="Название"
                      defaultValue={el?.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Label>Город</Form.Label>
                    <Form.Control
                      placeholder="Город"
                      defaultValue={el?.town}
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                    />
                    <Form.Label>Площадь</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Площадь"
                      defaultValue={el?.square}
                      value={square}
                      onChange={(e) => setSquare(Number(e.target.value))}
                    />
                    <Form.Label>Время открытия</Form.Label>
                    <Form.Control
                      placeholder="Время открытия"
                      defaultValue={el?.opening_time}
                      value={opening_time}
                      onChange={(e) => setOpTime(Date(e.target.value))}
                    />
                    <Form.Label>Время закрытия</Form.Label>
                    <Form.Control
                      type="dateTime"
                      placeholder="Время закрытия"
                      defaultValue={el?.closing_time}
                      value={closing_time}
                      onChange={(e) => setClTime(Date(e.target.value))}
                    />
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Описание"
                      defaultValue={el?.description}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Check
                      type={'checkbox'}
                      label={`Наличие аниматоров`}
                      value={animator}
                      onChange={(e) => setAnimator(Boolean(e.target.value))}
                    />
                    <Form.Check
                      type={'checkbox'}
                      label={`Наличие водных пространств`}
                      value={watersafe}
                      onChange={(e) => setWatersafe(Boolean(e.target.value))}
                    />
                    <Form.Check
                      type={'checkbox'}
                      label={`Наличие уголка с животными`}
                      value={zoo}
                      onChange={(e) => setZoo(Boolean(e.target.value))}
                    />
                    <Form.Label>Количестов кафе</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Количестов кафе"
                      defaultValue={el?.cafe}
                      value={cafe}
                      onChange={(e) => setCafe(Number(e.target.value))}
                    />
                    <Form.Label>Количестов сувернирных лавок</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Количестов сувернирных лавок"
                      defaultValue={el?.shop}
                      value={shop}
                      onChange={(e) => setShop(Number(e.target.value))}
                    />
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control
                      placeholder="Адрес"
                      defaultValue={el?.adress}
                      value={adress}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </Form.Group>
                )
              })}
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>
                Зоны для отдыха и прогулок
              </Form.Label>
            </Form.Group>
            {greenZones &&
              greenZones.parks.map((el) =>
                el.greenZones.map((el) => (
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    {console.log('el', el)}
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                      placeholder="Название"
                      defaultValue={el?.name}
                      value={gzName}
                      onChange={(e) => setGzName(e.target.value)}
                    ></Form.Control>

                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Описание"
                      defaultValue={el?.description}
                      value={gzDescription}
                      onChange={(e) => setGzDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                ))
              )}
            <Button
              variant="primary"
              onClick={() => (
                updatePark(),
                updateGreenZone(),
                navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
              )}
            >
              Обновить
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>Создать парк</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* {console.log('el', el)} */}
              <Form.Label>Название</Form.Label>
              <Form.Control
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>

              <Form.Label>Город</Form.Label>
              <Form.Control
                placeholder="Город"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              ></Form.Control>

              <Form.Label>Площадь</Form.Label>
              <Form.Control
                type="number"
                placeholder="Площадь"
                value={square}
                onChange={(e) => setSquare(e.target.value)}
              ></Form.Control>

              <Form.Label>Время открытия</Form.Label>
              <Form.Control
                placeholder="Время открытия"
                value={opening_time}
                onChange={(e) => setOpTime(e.target.value)}
              ></Form.Control>

              <Form.Label>Время закрытия</Form.Label>
              <Form.Control
                type="dateTime"
                placeholder="Время закрытия"
                value={closing_time}
                onChange={(e) => setClTime(e.target.value)}
              ></Form.Control>

              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>

              <Form.Check
                type={'checkbox'}
                label={`Наличие аниматоров`}
                value={animator}
                onChange={(e) => setAnimator(e.target.value)}
              />

              <Form.Check
                type={'checkbox'}
                label={`Наличие водных пространств`}
                value={watersafe}
                onChange={(e) => setWatersafe(e.target.value)}
              />

              <Form.Check
                type={'checkbox'}
                label={`Наличие уголка с животными`}
                value={zoo}
                onChange={(e) => setZoo(e.target.value)}
              />

              <Form.Label>Количестов кафе</Form.Label>
              <Form.Control
                type="number"
                placeholder="Количестов кафе"
                value={cafe}
                onChange={(e) => setCafe(e.target.value)}
              ></Form.Control>

              <Form.Label>Количестов сувернирных лавок</Form.Label>
              <Form.Control
                type="number"
                placeholder="Количестов сувернирных лавок"
                value={shop}
                onChange={(e) => setShop(e.target.value)}
              ></Form.Control>

              <Form.Label>Адрес</Form.Label>
              <Form.Control
                placeholder="Адрес"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green' }}>
                Зоны для отдыха и прогулок
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* {console.log('el', el)} */}
              <Form.Label>Название</Form.Label>
              <Form.Control
                placeholder="Название"
                value={gzName}
                onChange={(e) => setGzName(e.target.value)}
              ></Form.Control>

              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Описание"
                value={gzDescription}
                onChange={(e) => setGzDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => (
                newPark(),
                newGreenZone(),
                navigate(STUFF_ROUTE + MAIN_ADMIN_ROUTE)
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

export default EditingParkInfo
