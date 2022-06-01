import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '..'
import { stuffFetchGreenZone, stuffFetchPark } from '../http/parkAPI'

const EditingParkInfo = () => {
  const [park, setPark] = useState()
  const [greenZones, setGreenZones] = useState()
  useEffect(() => {
    stuffFetchPark().then((data) => setPark(data))
    stuffFetchGreenZone().then((data) => setGreenZones(data))
  }, [])

  console.log('el', greenZones)
  const navigate = useNavigate()

  //   const searchParks = useMemo(() => {
  //     return park.parks.filter((onePark) =>
  //       onePark.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   }, [searchQuery, park.parks])

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{ color: 'green' }}>
          Редактировать информацию о парке
        </Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      {park &&
        park.park.map((el) =>
          el.map((el) => (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              {console.log('el', el)}
              <Form.Label>Название</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.name}
              </Form.Control>

              <Form.Label>Город</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.town}
              </Form.Control>

              <Form.Label>Площадь</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.square}
              </Form.Control>

              <Form.Label>Время открытия</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.opening_time}
              </Form.Control>

              <Form.Label>Время закрытия</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.closing_time}
              </Form.Control>

              <Form.Label>Описание</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.description}
              </Form.Control>

              <Form.Label>Наличие аниматоров</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.animators}
              </Form.Control>

              <Form.Label>Наличие водных пространств</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.watersafe}
              </Form.Control>

              <Form.Label>Наличие уголка с животными</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.zoo}
              </Form.Control>

              <Form.Label>Количестов кафе</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.cafe}
              </Form.Control>

              <Form.Label>Количестов сувернирных лавок</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.shop}
              </Form.Control>

              <Form.Label>Адрес</Form.Label>
              <Form.Control type="password" placeholder="Password">
                {el?.adress}
              </Form.Control>
            </Form.Group>
          ))
        )}
      <Button variant="primary">Submit</Button>
    </Form>
  )
}

export default EditingParkInfo
