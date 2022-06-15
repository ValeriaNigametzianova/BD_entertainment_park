import React from 'react'
import classnames from 'classnames'

import * as Calendar from '../components/Calendar'

import '../styles/calendar/CalendarStore.css'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default class CalendarStore extends React.Component {
  static defaultProps = {
    date: new Date(),
    years: [2022, 2023],
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    onChange: Function.prototype,
  }

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  }

  get year() {
    return this.state.date.getFullYear()
  }

  get month() {
    return this.state.date.getMonth()
  }

  get day() {
    return this.state.date.getDate()
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1)

    this.setState({ date })
  }

  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1)

    this.setState({ date })
  }

  handleSelectChange = () => {
    const year = this.yearSelect.value
    const month = this.monthSelect.value

    const date = new Date(year, month)

    this.setState({ date })
  }

  handleDayClick = (date) => {
    this.setState({ selectedDate: date })

    this.props.onChange(date)
  }

  render() {
    const { years, monthNames, weekDayNames } = this.props
    const { currentDate, selectedDate } = this.state

    const monthData = Calendar.getMonthData(this.year, this.month)

    return (
      <Form className="calendar">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button
              className="button2"
              onClick={this.handlePrevMonthButtonClick}
            >
              {'<'}
            </Button>
          </Col>
          <Col md="auto">
            <Form.Select
              ref={(element) => (this.monthSelect = element)}
              value={this.month}
              onChange={this.handleSelectChange}
            >
              {monthNames.map((name, index) => (
                <option key={name} value={index}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md="auto">
            <Form.Select
              ref={(element) => (this.yearSelect = element)}
              value={this.year}
              onChange={this.handleSelectChange}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button
              className="button2"
              onClick={this.handleNextMonthButtonClick}
            >
              {'>'}
            </Button>
          </Col>
        </Row>

        <table>
          <thead>
            <tr>
              {weekDayNames.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {monthData.map((week, index) => (
              <tr key={index} className="week">
                {week.map((date, index) =>
                  date ? (
                    <td
                      key={index}
                      className={classnames('day', {
                        today: Calendar.areEqual(date, currentDate),
                        selected: Calendar.areEqual(date, selectedDate),
                      })}
                      onClick={() => this.handleDayClick(date)}
                    >
                      {date.getDate()}
                    </td>
                  ) : (
                    <td key={index} />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Form>
    )
  }
}
