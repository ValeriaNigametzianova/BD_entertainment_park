import React, { useContext } from 'react'
// import {Routes, Route, Redirect} from 'react-router-dom'
// import {authRoutes, publicRoutes} from "../Routes";
// import {MAIN_ROUTE} from "../utils/Consts";
import { Context } from '../index'
// import Main from "../pages/Main"
import { Row } from 'react-bootstrap'
import ParkItem from '../components/ParkItem'
import { observer } from 'mobx-react-lite'

const ParkList = observer(() => {
  const { park } = useContext(Context)

  return (
    <Row className="d-flex">
      {park.parks.map((park) => (
        <ParkItem key={park.id} park={park} />
      ))}
    </Row>
  )
})

export default ParkList
