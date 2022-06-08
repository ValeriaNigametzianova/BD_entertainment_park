import React, { useContext, useEffect, useState } from 'react'
// import {authRoutes, publicRoutes} from "../Routes";
// import {MAIN_ROUTE} from "../utils/Consts";
import { Context } from '../index'
import { Container, Row } from 'react-bootstrap'
import AttractionItem from '../components/AttractionItem'
import { observer } from 'mobx-react-lite'
import { stuffFetchAttraction, stuffFetchPark } from '../http/parkAPI'

const AttractionList = observer(() => {
  // const { park } = useContext(Context)
  const [park, setPark] = useState()
  const [attractions, setAttractions] = useState([])
  // const { id } = useParams()
  useEffect(() => {
    console.log('uuuuuuuuuu')
    stuffFetchPark().then((data) => {
      setPark(data.parks)
      console.log('attrs', data)
    })
    stuffFetchAttraction().then((data) => {
      setAttractions(data.attractions)
      console.log('attrs', data)
    })
  }, [])
  // const navigate = useNavigate()
  console.log('attrs', park)
  console.log('attrs', attractions)

  return (
    <Container className="contr">
      <Row className="d-flex">
        {attractions.length &&
          attractions.map((el) =>
            el.map((el) => <AttractionItem key={el.id} attraction={el} />)
          )}
      </Row>
    </Container>
  )
})

export default AttractionList
