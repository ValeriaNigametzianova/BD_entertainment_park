import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PARK_ATTRACTIONS_ROUTE, STUFF_ROUTE } from '../utils/Consts'
import { deleteAttraction } from '../http/attractionAPI'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/container/container.css'
// import '../styles/Items/attractionItem.css'
import '../styles/fonts/fonts.css'

const AttractionItem = ({ attraction }) => {
  const destroyAttraction = (deletedAttraction) => {
    deleteAttraction(deletedAttraction.id).then((data) => {})
    window.location.reload()
  }

  const navigate = useNavigate()
  const el = attraction
  return (
    <Row className="mt-3 attractionItem">
      {attraction && (
        <Row className="px-2">
          <Row className="heading2 text-start">
            <div>{el?.name}</div>
          </Row>
          <Row className="heading4 description">
            <div>Описание: {el?.description}</div>
          </Row>
          <Row>
            <Row className="heading4 description">
              <div>Высота: {el?.hight}</div>
            </Row>
            <Row className="heading4 description">
              <div>Ограничение по возрасту: {el?.age_limitation}</div>
            </Row>
            <Row className="heading4 description">
              <div>Ограничение по весу: {el?.weight_limitation}</div>
            </Row>
            <Row className="heading4 description">
              <div>Ограничение по росту: {el?.hight_limitation}</div>
            </Row>
            <Row className="heading4 description">
              <div>
                Максимальное количество человек: {el?.max_quantity_people}
              </div>
            </Row>
            <Row className="heading4 description">
              <div>
                {el?.active ? 'Открыт к посещению' : 'Сейчас недоступен'}
              </div>
            </Row>
          </Row>
          <Row className="d-flex my-4 align-items-center">
            <Col className="d-flex justify-content-center">
              <Button
                className="button-warning"
                onClick={() => {
                  destroyAttraction(el)
                }}
              >
                Удалить аттракцион
              </Button>
            </Col>
            <Col className="d-flex justify-content-center">
              <Button
                className="button-green"
                key={el.id}
                attraction={el}
                onClick={() => {
                  navigate(STUFF_ROUTE + PARK_ATTRACTIONS_ROUTE + '/' + el.id)
                }}
              >
                Обновить даннные
              </Button>
            </Col>
          </Row>
        </Row>
      )}
    </Row>
  )
}
export default AttractionItem
