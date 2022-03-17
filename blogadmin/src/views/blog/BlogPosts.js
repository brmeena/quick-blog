import React, { lazy,useEffect,useState } from 'react'
import { CButton, CTable, CTableBody,CTableHead,CTableRow,CTableHeaderCell,CTableDataCell } from '@coreui/react'

import { Link } from 'react-router-dom'
import resourceservice from 'src/services/resourceservice';
import resourcetypes from 'src/constants/resourcetypes';
const BlogPosts=()=>{
  const [posts, setposts] = useState([]);
  const [postItemList,setPostItemList]=useState("");
  useEffect(() => {
    resourceservice.getAll(resourcetypes.BLOG_POST).then(tposts=>{
      //console.log(tposts);
      setposts(tposts);
      let tmpPostItemList=tposts.map((postitem) => 
        (
          <CTableRow key={postitem._id}>
          <CTableDataCell scope="row">{postitem.title}</CTableDataCell>
          <CTableDataCell scope="row">{postitem.category && postitem.category.name}</CTableDataCell>
          <CTableDataCell>{postitem.updated}</CTableDataCell>
          <CTableDataCell><Link to={`/editpost?id=${postitem._id}`}>Edit</Link></CTableDataCell>
          </CTableRow>
      ));
      setPostItemList(tmpPostItemList);
      console.log(postItemList);
    });

    return () => {
    }
  }, [])
  return (
        <div>
          <CButton type="link" href="#addpost">Create Post</CButton>
            <h2>Blog posts will come here</h2>
            <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Post Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Update Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {postItemList}
            </CTableBody>
          </CTable>
        </div>
    )
}

export default BlogPosts