import React, { useContext } from 'react'
// import {Routes, Route, Redirect} from 'react-router-dom'
// import {authRoutes, publicRoutes} from "../Routes";
// import {MAIN_ROUTE} from "../utils/Consts";
import { Context } from '../index'
// import Main from "../pages/Main"
import { Container, Row } from 'react-bootstrap'
import ParkItem from '../components/ParkItem'
import { observer } from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/cont/contr.css'

const ParkList = observer(() => {
  const { park } = useContext(Context)
  console.log('olo', park?.parks)
  console.log('lll', park?.searchPark)

  return (
    <Container className="contr">
      <Row className="d-flex " style={{ cursor: 'pointer' }}>
        {/* {park.searchPark.length */}
        {/* ?  */}
        {park?.searchPark.map((park) => {
          return <ParkItem key={park.id} park={park} />
        })}
        {/* :  */}
        {/* park.parks.map((park) => {
              console.log('2')
              return <ParkItem key={park.id} park={park} />
            })} */}
      </Row>
    </Container>
  )
})

export default ParkList
