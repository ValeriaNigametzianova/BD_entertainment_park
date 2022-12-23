import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PARK_ATTRACTIONS_ROUTE, STUFF_ROUTE } from '../utils/Consts'
import { deleteAttraction } from '../http/attractionAPI'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/container/container.css'
import '../styles/Items/attractionItem/attractionItem.css'

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
          {el?.name && (
            <Row className="heading2 text-start">
              <div>{el?.name}</div>
            </Row>
          )}

          {el?.hight && (
            <Row className="heading4 description">
              <div>Описание: {el?.description}</div>
            </Row>
          )}
          <Row>
            {el?.hight && (
              <Row className="heading4 description">
                <div>Высота: {el?.hight}м</div>
              </Row>
            )}
            {el?.age_limitation && (
              <Row className="heading4 description">
                <div>Ограничение по возрасту: {el?.age_limitation} лет</div>
              </Row>
            )}
            {el?.weight_limitation && (
              <Row className="heading4 description">
                <div>Ограничение по весу: {el?.weight_limitation}кг</div>
              </Row>
            )}
            {el?.hight_limitation && (
              <Row className="heading4 description">
                <div>Ограничение по росту: {el?.hight_limitation}см</div>
              </Row>
            )}
            {el?.max_quantity_people && (
              <Row className="heading4 description">
                <div>Максимальное количество человек: {el?.max_quantity_people}</div>
              </Row>
            )}
            <Row className="heading4 description">
              <div>{el?.active ? 'Открыт к посещению' : 'Сейчас недоступен'}</div>
            </Row>
          </Row>
          <Row className="d-flex mb-3 mt-5 align-items-center">
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
