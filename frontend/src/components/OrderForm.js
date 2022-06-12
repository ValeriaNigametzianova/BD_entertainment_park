import React, { useContext, useEffect, useState } from 'react'
// import {Routes, Route, Redirect} from 'react-router-dom'
// import {authRoutes, publicRoutes} from "../Routes";
// import {MAIN_ROUTE} from "../utils/Consts";
import { Context } from '../index'
// import Main from "../pages/Main"
import { Button, Container, Form, Row } from 'react-bootstrap'
import TarifItem from '../components/TarifItem'
import { observer } from 'mobx-react-lite'
import { stuffFetchPark, stuffFetchTarif } from '../http/parkAPI'
import { useNavigate, useParams } from 'react-router-dom'

const OrderForm = ({ createOrder }) => {
  const [park, setPark] = useState()
  const [surname, setSername] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone_number, setPhoneNumber] = useState()
  const navigate = useNavigate()

  const createForm = () => {
    const customer = {
      surname: surname,
      name: name,
      email: email,
      phone_number: phone_number,
    }
    createOrder(customer)
  }

  return (
    <Container>
      <Form md={8}>
        <Form.Group className="mb-3 fs-3">
          <Form.Label style={{ color: 'green' }}>Данные покупателя</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            placeholder="Фамилия"
            value={surname}
            onChange={(e) => setSername(e.target.value)}
          />
          <Form.Label>Имя</Form.Label>
          <Form.Control
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            controlId="formBasicLogin"
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control
            type="tel"
            pattern="[+7]-[0-9]{3}-[0-9]{3}-[0-9]{4}"
            defaultValue={'+7'}
            placeholder="Введите номер"
            value={phone_number}
            onChange={(e) => setPhoneNumber(Number(e.target.value))}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => {
            createForm()
          }}
        >
          Купить билет
        </Button>
      </Form>
    </Container>
  )
}

export default OrderForm
