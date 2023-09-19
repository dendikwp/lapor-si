import React, { Fragment, useEffect, useState } from 'react'
import { deleteAllCookies, getTokenFromCookie } from '../../utils/setToken'
import Sidebar from './sidebar'
import Header from './header'
import DashboardRoutes from '../../routes/dashboard-routes'

export default function Dashboard() {
  let token = getTokenFromCookie()
  const [isAuth, setIsAuth] = useState(false)
  const [isToggle, setIsToogle] = useState(false)

  const handleToggle = () => {
    setIsToogle(!isToggle)
  }

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsToogle(true)
    }
  }, [])

  useEffect(() => {
    if (token != null) {
      setIsAuth(true)
    } else {
      deleteAllCookies()
      window.location.replace('/')
    }
  }, [token])

  return (
    <Fragment>
      {isAuth ?
        <div id="wrapper">
          <Sidebar isToggle={isToggle} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header
                handleToggle={handleToggle} />
              <div className="container-fluid">
                <DashboardRoutes />
              </div>
            </div>
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright©UPT-SI</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
        : null}
    </Fragment>
  )
}
