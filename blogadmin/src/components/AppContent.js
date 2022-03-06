import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import {authService} from "../services/authservice"

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
          {(authService.getUser && (
            <Switch>
            {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/dashboard" />
          </Switch>
          ))}
          {(!authService.getUser && (
            <Switch>
             <Redirect from="*" to="/login" />
          </Switch>
          ))}        
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
