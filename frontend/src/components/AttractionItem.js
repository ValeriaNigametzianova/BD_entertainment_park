import React, { useContext, useEffect, useState } from 'react'
import { Col, Card, Image, Row, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  ATTRACTIONS_ADMIN_ROUTE,
  PARK_ATTRACTIONS_ROUTE,
  PARK_MAIN_ROUTE,
  STUFF_ROUTE,
} from '../utils/Consts'
import { deleteAttraction } from '../http/attractionAPI'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/container/container.css'
import { stuffFetchAttraction } from '../http/parkAPI'
import { Context } from '..'

const AttractionItem = ({ attraction }) => {
  const { park } = useContext(Context)
  const [attractions, setAttractions] = useState([])

  useEffect(() => {
    stuffFetchAttraction().then((data) => {
      setAttractions(data.attractions)
    })
  }, [])

  const destroyAttraction = (deletedAttraction) => {
    deleteAttraction(deletedAttraction.id).then((data) => {})
    window.location.reload()
  }

  const navigate = useNavigate()
  const el = attraction
  return (
    <Container
      className="container"
      // onClick={() => navigate(PARK_MAIN_ROUTE + '/' + park.id)}
    >
      <Row className="mt-9">
        {
          attraction && (
            // attraction.map((el) => (
            <Row mt={5}>
              <Row className="heading4">
                <h2>Название: {el?.name}</h2>
              </Row>
              <Row className="heading4">
                <div>Описание: {el?.description}</div>
              </Row>
              <Col>
                <Row className="heading4">
                  <div>Высота: {el?.hight}</div>
                </Row>
                <Row className="heading4">
                  <div>Ограничение по возрасту: {el?.age_limitation}</div>
                </Row>
                <Row className="heading4">
                  <div>Ограничение по весу: {el?.weight_limitation}</div>
                </Row>
                <Row className="heading4">
                  <div>Ограничение по росту: {el?.hight_limitation}</div>
                </Row>
                <Row className="heading4">
                  <div>
                    Максимальное количество человек: {el?.max_quantity_people}
                  </div>
                </Row>
                <Row className="heading4">
                  <div>
                    {el?.active ? 'Открыт к посещению' : 'Сейчас недоступен'}
                  </div>
                </Row>
              </Col>
              <Row>
                <Col>
                  <Button
                    className="button2"
                    onClick={() => {
                      destroyAttraction(el)
                    }}
                  >
                    Удалить аттракцион
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="button2"
                    onClick={() =>
                      navigate(
                        STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE + '/' + el.id
                      )
                    }
                  >
                    Обновить даннные
                  </Button>
                </Col>
              </Row>
            </Row>
          )
          // ))
        }
      </Row>
    </Container>
  )
}
export default AttractionItem
