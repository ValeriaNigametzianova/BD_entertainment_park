import * as React from 'react'
import { useContext } from 'react'
import {
  Routes,
  Route,
  Redirect,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { authCustomerRoutes, authStuffRoutes, publicRoutes } from '../Routes'
import { MAIN_ROUTE } from '../utils/Consts'
import { Context } from '../index'
import Main from '../pages/Main'
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()

  console.log(user)
  return (
    <Routes>
      {console.log('role', user.role)}
      {user.role === 'stuff' &&
        authStuffRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      {user.role === 'customer' &&
        authCustomerRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      {publicRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={Component} />
      })}
      <Route path="*" element={<Navigate replace to="/park" />} />
    </Routes>
  )
})
export default AppRouter
