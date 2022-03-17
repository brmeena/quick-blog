import { CButton, CFormLabel } from '@coreui/react';
import { ErrorMessage, Field, Formik } from 'formik';
import { Form } from 'formik';
import React,{useRef,useEffect, useState} from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import resourceservice from 'src/services/resourceservice';
import resourcetypes from 'src/constants/resourcetypes';
import CErrorMessage from 'src/components/error/CErrorMessage';
function AddCategory() {
    const formikRef= useRef(null);
    const history= useHistory();
    const [resourceObj,setResourceObj]=useState({'title':'','description':'','name':''});
    const search = useLocation().search;
    const resourceId = new URLSearchParams(search).get('id');
    let initValues={
        'title':resourceObj['title'],
        'description':resourceObj['description'],
        'name':resourceObj['name'],
    };
    useEffect(()=> {
        if(resourceId){
            console.log("id is "+resourceId);
            resourceservice.getById(resourcetypes.CATEGORY,resourceId).then((resourceItem)=> {
                console.log(resourceItem);
                setResourceObj(resourceItem);
            });
        }
        else{
            console.log("id is null");
        }
    },[]);
    const validationSchema=Yup.object({
        title:Yup.string().required("Required"),
        name:Yup.string().required("Required"),
        description:Yup.string().required("Required"),
        
    });
    const handleOnSubmit=(values)=>{
        console.log("handle on submit called");
        console.log(values);
        if(resourceId)
        {
            console.log("updating resource: "+resourceId);
            resourceservice.update(resourcetypes.CATEGORY, resourceId,values).then(()=>{
                window.alert("resource updated");
                history.push("/categories");
            })
        }
        else{
            resourceservice.create(resourcetypes.CATEGORY,values).then(()=>{
                window.alert("resource created");
                history.push("/categories");
            })
        }
    }

  return (
    <div>
        <h2>Add Blog Category</h2>
        <Formik
        ref={formikRef}
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
            handleOnSubmit(values)
        }}
        enableReinitialize
        >
            <Form>
            <div className='form-group'>
                <CFormLabel>Category Name</CFormLabel><br/>
                <Field name="name" className="form-input" type="text" size="30"/>
                <CErrorMessage name="name"/>
                </div><br/>
                
                <div className='form-group'>
                <CFormLabel>Category title</CFormLabel><br/>
                <Field name="title" className="form-input" type="text" size="80"/>
                <CErrorMessage name="title"/>
                </div><br/>
                <div className='form-group'>
                <CFormLabel>Category Description</CFormLabel><br/>
                <Field name="description" className="form-input" as="textarea" cols="80" rows="2"/>
                <CErrorMessage name="description"/>
                </div><br/>
                <br/>
                <CButton type="submit">Save</CButton>
                
            </Form>
        </Formik>

    </div>
  )
};
export default AddCategory;