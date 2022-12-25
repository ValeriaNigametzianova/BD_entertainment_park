import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import AttractionItem from '../components/AttractionItem'
import { observer } from 'mobx-react-lite'
import { stuffFetchAttraction, stuffFetchPark } from '../http/parkAPI'
import { Context } from '../index'

const AttractionList = observer(() => {
  const { park } = useContext(Context)
  useEffect(() => {
    stuffFetchAttraction().then((data) => {
      park.setAttraction(data.attractions)
    })
  }, [])

  return (
    <Row>
      {park.attractions.length &&
        park.attractions.map((el) => el.map((el) => <AttractionItem key={el.id} attraction={el} />))}
    </Row>
  )
})

export default AttractionList
