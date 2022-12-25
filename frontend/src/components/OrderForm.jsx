import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Context } from '../index'
import '../styles/fonts/fonts.css'

const OrderForm = observer(({ createOrder }) => {
  const { park } = useContext(Context)
  const [surname, setSername] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone_number, setPhoneNumber] = useState()

  const createForm = () => {
    console.log(surname, name, email, phone_number)
    if (!surname || !name || !email || !phone_number) {
      console.log(555)
      park.setAlertMessage('Заполните данные формы')
      park.setAlertStatus(206)
      park.setVisible(true)
      return
    }
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
      <Form className="mt-4">
        <Form.Group className="mb-2">
          <Form.Label className="heading2">Данные покупателя</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlid="formBasicPassword">
          <Form.Label className=" description">Фамилия</Form.Label>
          <Form.Control placeholder="Фамилия" value={surname} onChange={(e) => setSername(e.target.value)} />
          <Form.Label className="mt-3 description">Имя</Form.Label>
          <Form.Control placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
          <Form.Label className="mt-3 description">Электронная почта</Form.Label>
          <Form.Control
            controlid="formBasicLogin"
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label className="mt-3 description">Номер телефона</Form.Label>
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
          className="button2 mt-3"
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
})

export default OrderForm
