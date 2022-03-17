import React, { lazy,useEffect,useState } from 'react'
import { CButton, CTable, CTableBody,CTableHead,CTableRow,CTableHeaderCell,CTableDataCell } from '@coreui/react'

import { Link } from 'react-router-dom'
import resourceservice from 'src/services/resourceservice';
import resourcetypes from 'src/constants/resourcetypes';
const Categories=()=>{
  const [categories, setCategories] = useState([]);
  const [categoryItemList,setCategoryItemList]=useState("");
  useEffect(() => {
    resourceservice.getAll(resourcetypes.CATEGORY).then(tcategories=>{
      //console.log(tposts);
      setCategories(tcategories);
      let tmpCategoryItemList=tcategories.map((categoryitem) => 
        (
          <CTableRow key={categoryitem._id}>
          <CTableDataCell scope="row">{categoryitem.name}</CTableDataCell>
          <CTableDataCell>{categoryitem.updated}</CTableDataCell>
          <CTableDataCell><Link to={`/editcategory?id=${categoryitem._id}`}>Edit</Link></CTableDataCell>
          </CTableRow>
      ));
      setCategoryItemList(tmpCategoryItemList);
      console.log(categoryItemList);
    });

    return () => {
    }
  }, [])
  return (
        <div>
          <CButton type="link" href="#addcategory">Create Category</CButton>
            <h2>Blog categories will come here</h2>
            <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Update Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {categoryItemList}
            </CTableBody>
          </CTable>
        </div>
    )
}

export default Categories