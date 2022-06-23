import * as React from 'react'
import { useContext } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { authCustomerRoutes, authStuffRoutes, publicRoutes } from '../Routes'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
  const { user } = useContext(Context)

  return (
    <Routes>
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
