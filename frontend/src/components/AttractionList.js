import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import AttractionItem from '../components/AttractionItem'
import { observer } from 'mobx-react-lite'
import { stuffFetchAttraction, stuffFetchPark } from '../http/parkAPI'

const AttractionList = observer(() => {
  const [park, setPark] = useState()
  const [attractions, setAttractions] = useState([])
  useEffect(() => {
    stuffFetchPark().then((data) => {
      setPark(data.parks)
    })
    stuffFetchAttraction().then((data) => {
      setAttractions(data.attractions)
    })
  }, [])

  return (
    <Row>
      {attractions.length && attractions.map((el) => el.map((el) => <AttractionItem key={el.id} attraction={el} />))}
    </Row>
  )
})

export default AttractionList
