import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {authService} from 'src/services/authservice'
import CErrorMessage from 'src/components/error/CErrorMessage'
import { useLocation } from 'react-router-dom'

const Login = () => {
  const [userId,setUserId]= useState("");
  const [password,setPassword]=useState("");
  const [authError,setAuthError]= useState("");
  const history= useHistory();
  const location = useLocation();
  const handleSubmit=(event)=> {
    console.log("on submit called");
    setAuthError("");
    authService.authenticate(userId,password)
    .then((user)=> {
      console.log("successfully logged in");
      console.log(user);
      console.log("token is "+user.data.token);
      history.push("/dashboard");
      location.reload();
    })
    .catch((err)=> {
      console.log(err);
      setAuthError("Unable to login")
    })

  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                  onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username"
                      onChange={(e)=> setUserId(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e)=> setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
  
                    </CRow>
                    {(authError) && (
                      <CRow>
                      <CCol>
                        <p style={{color:'red'}}>{authError}</p>
                      </CCol>
                      </CRow>
                    )}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
