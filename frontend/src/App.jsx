import { useContext, useEffect, useState } from 'react'
import React from 'react'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Spinner } from 'react-bootstrap'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import { stuffCheck } from './http/stuffAPI'
import { customerCheck } from './http/customerAPI'
import './styles/app/app.css'
import { useCallback } from 'react'

const App = observer(() => {
  const { user } = useContext(Context)
  const { park } = useContext(Context)
  const [loading, setLoading] = useState(true)

  // //считает ширину окна без прокрутки
  // const setWidthPage = useCallback(() => {
  //   let widthClient = window.innerWidth - document.documentElement.clientWidth
  //   // setWidthClient(window.innerWidth - document.documentElement.clientWidth)
  //   if (widthClient == 0) {
  //     document.getElementById('root').style['padding-right'] = 0
  //   }
  //   return widthClient
  // }, [window.innerWidth, document.documentElement.clientWidth])
  useEffect(() => {
    stuffCheck()
      .then((data) => {
        user.setUser(data)
        user.setIsAuth(true)
        user.setRole(data.role)
      })
      .finally(() => setLoading(false))
  }, [])
  useEffect(() => {
    customerCheck()
      .then((data) => {
        user.setUser(data)
        user.setIsAuth(true)
        user.setRole(data.role)
      })
      .finally(() => setLoading(false))
  }, [])
  if (loading) {
    return <Spinner animation={'grow'} className={'text-light'} />
  }

  // useEffect(() => {
  //   setWidthPage()
  // }, [document.documentElement.clientWidth])

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <div className="wrap">
          <AppRouter />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
})
export default App
