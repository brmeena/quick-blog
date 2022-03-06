import React from "react"
import { CCol, CContainer, CRow,CButton } from "@coreui/react"
import { installService } from "src/services/installservice";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const Install=()=>{
    const [adminUser,setAdminUser]= React.useState(null);
    const [installError,setInstallError]= React.useState("")
    const history=useHistory();
    React.useEffect(()=> {
        setInstallError("")
        installService.installAdmin()
        .then((user)=> {
            console.log(user.data);
            setAdminUser(user.data)
        })
        .catch((err)=> {
            setInstallError("Installation failed. Refresh again. or clean MongoCollection (User)")
        })
    },[])
    const loginPage=()=>{
          history.push("/login");
    }
    return (
        <div>
            <CContainer>
                <CRow>
                    <CCol>
                        <h2>creating Admin User...Please wait...</h2>
                        {adminUser && (
                             <div>
                             <h3>Note down below admin login password: </h3>
                             <p>Login: admin</p>
                             <p>Password: {adminUser.adminpassword}</p>
                             <br/>
                             <CButton onClick={()=>loginPage()}>Login here</CButton>
                             </div>
                        )}
                        {installError && (
                            <div>
                                <p style={{color:"red"}}>{installError}</p>
                            </div>
                        )}
                    </CCol>
                </CRow>
            </CContainer>

        </div>
    )
}

export default Install