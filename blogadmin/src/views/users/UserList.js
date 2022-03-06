import React, { lazy,useEffect,useState } from 'react'
import { CButton, CTable, CTableBody,CTableHead,CTableRow,CTableHeaderCell,CTableDataCell,CRow,CContainer,CCol } from '@coreui/react'
import resourceService from '../../services/resourceservice'
import { Link } from 'react-router-dom'
import resourcetypes from 'src/constants/resourcetypes'
const UserList=()=>{
  const [users, setUsers] = useState([]);
  const [userItemList,setUserItemList]=useState("");
  useEffect(() => {
    resourceService.getAll(resourcetypes.USER).then(tusers=>{
      //console.log(tposts);
      setUsers(tusers);
      let tmpUserItemList=tusers.map((useritem) => 
        (
          <CTableRow key={useritem._id}>
          <CTableDataCell scope="col">{useritem.name}</CTableDataCell>
          <CTableDataCell scope="col">{useritem.userid}</CTableDataCell>
          <CTableDataCell scope="col">{useritem.role}</CTableDataCell>
          <CTableDataCell scope="col"><Link to={`/edituser?id=${useritem._id}`}>Edit</Link></CTableDataCell>
          </CTableRow>
      ));
      setUserItemList(tmpUserItemList);
      console.log(userItemList);
    });

    return () => {
    }
  }, [])
  return (
        <div>
          <CContainer>
            <CRow>
            <CCol md={5}><h2>User List will come here</h2>
            </CCol>
            <CCol md={3}>
            <CButton type="link" href="#adduser">Create User</CButton>
            </CCol>
            </CRow>
            <CTable>
            <CTableHead>
              <CTableRow className='table-primary'>
                <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">User Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">User Role</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {userItemList}
            </CTableBody>
          </CTable>
          </CContainer>
        </div>
    )
}

export default UserList