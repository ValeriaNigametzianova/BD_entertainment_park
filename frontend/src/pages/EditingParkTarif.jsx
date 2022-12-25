import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../index'
import { stuffFetchPark, stuffFetchOneTarif } from '../http/parkAPI'
import { createTarif, editTarif } from '../http/tarifAPI'
import { STUFF_ROUTE, TARIF_ADMIN_ROUTE } from '../utils/Consts'

const EditingParkTarif = observer(() => {
  const { park } = useContext(Context)
  const [tarif, setTarif] = useState({})
  const { id } = useParams()

  useEffect(() => {
    stuffFetchOneTarif(id).then((data) => {
      const tarif = data.tarif
      stuffFetchPark().then((data) => {
        data.parks.map((data) => {
          let park = data.park
          setTarif({ ...tarif, ParkId: park.id })
        })
      })
    })
  }, [])
  const navigate = useNavigate()

  const updateTarif = async () => {
    await editTarif(tarif).then((data) => {
      park.setAlertStatus(data.status)
      park.setAlertMessage(data.data.message)
      if (data.status !== 200) park.setVisible(true)
    })
  }
  const newTarif = async () => {
    await createTarif(tarif).then((data) => {
      park.setAlertStatus(data.status)
      park.setAlertMessage(data.data.message)
      if (data.status !== 200) park.setVisible(true)
    })
  }

  return (
    <Container className="contr">
      <Container className={'d-flex justify-content-center text-light'}>
        <Col>
          <Form>
            <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
              {tarif?.id ? (
                <Form.Label className="heading2_1 description">Редактировать информацию о тарифах</Form.Label>
              ) : (
                <Form.Label className="heading2_1 description">Создать тариф</Form.Label>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="heading3 description">Название</Form.Label>
              <Form.Control
                placeholder="Название"
                value={tarif?.name}
                onChange={(e) => setTarif({ ...tarif, name: e.target.value })}
              />

              <Form.Label className="heading3 description">Стоимость</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                placeholder="Стоимость"
                value={tarif?.cost}
                onChange={(e) => setTarif({ ...tarif, cost: e.target.value.replace(/\D/, '') })}
              />

              <Form.Label className="heading3 description">Описание</Form.Label>
              <Form.Control
                className="heading4 mb-3"
                as="textarea"
                rows={7}
                placeholder="Описание"
                value={tarif?.description}
                onChange={(e) => setTarif({ ...tarif, description: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col>
                <Button className="button2" variant="primary" onClick={() => navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)}>
                  Назад
                </Button>
              </Col>
              {tarif?.id ? (
                <Col>
                  <Button
                    className="button-green"
                    variant="primary"
                    onClick={() =>
                      updateTarif().then(() => {
                        if (park.alertStatus === 200) navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)
                      })
                    }
                  >
                    Обновить
                  </Button>
                </Col>
              ) : (
                <Col>
                  <Button
                    className="button-green"
                    variant="primary"
                    onClick={() =>
                      newTarif().then(() => {
                        if (park.alertStatus === 200) navigate(STUFF_ROUTE + TARIF_ADMIN_ROUTE)
                      })
                    }
                  >
                    Создать
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </Col>
      </Container>
    </Container>
  )
})

export default EditingParkTarif
