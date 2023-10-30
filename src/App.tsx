import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Upload from './pages/Upload/Upload'
function App() {
  const router = [
    { path: '/', element: <Login /> },
    { path: '/upload', element: <Upload /> },
  ]

  type ReactRouteType = {
    path: string
    element: JSX.Element
    outlet?: ReactRouteType[]
  }
  return (
    <>
      <Routes>
        {router.map((route: ReactRouteType) => {
          const { path, element, outlet } = route
          if (outlet) {
            return (
              <Route key={path} path={path} element={element}>
                {outlet.map((outletRoute) => {
                  const { path, element } = outletRoute
                  return <Route key={path} path={path} element={element} />
                })}
              </Route>
            )
          } else {
            return <Route key={path} path={path} element={element} />
          }
        })}
      </Routes>
    </>
  )
}

export default App
