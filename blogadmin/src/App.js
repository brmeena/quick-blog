import React, { Component } from 'react'
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom'
import { authService } from './services/authservice'
import './scss/style.scss'
import Install from './views/pages/Install'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App(){
    console.log("value of authService.getUser"+authService.getUser);
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route path="/login" exact name="Login Page" render={(props) => <Login {...props} />} />  
            <Route path="/install" exact name="Install Page" render={(props) => <Install {...props} />} />  
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            {!authService.getUser && (
            <Route path="/" name="Login Page" render={(props) => <Login {...props} />} />  
            )}
            {authService.getUser && (
              <Route path="/" name="Home Page" render={(props) => <DefaultLayout {...props} />} />
            )}
            
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
}

export default App
