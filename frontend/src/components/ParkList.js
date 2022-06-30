import React, { useContext } from 'react'
import { Context } from '../index'
import { Col } from 'react-bootstrap'
import ParkItem from '../components/ParkItem'
import { observer } from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Items/parkItem/parkItem.css'
const ParkList = observer(() => {
  const { park } = useContext(Context)

  return (
    <Col>
      {park?.searchPark.map((park) => {
        return <ParkItem key={park.id} park={park} />
      })}
    </Col>
  )
})

export default ParkList
