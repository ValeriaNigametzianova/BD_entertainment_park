import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const OrderForm = ({ createOrder }) => {
  const [surname, setSername] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone_number, setPhoneNumber] = useState()

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
          <Form.Label style={{ color: '#151E20' }}>
            Данные покупателя
          </Form.Label>
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
          className="button2"
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
