import { CButton, CCol, CContainer, CFormLabel, CRow } from '@coreui/react';
import { ErrorMessage, Field, Formik } from 'formik';
import { Form } from 'formik';
import React,{useRef,useEffect, useState} from 'react';
import * as Yup from 'yup';
import resourceService from 'src/services/resourceservice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import resourcetypes from 'src/constants/resourcetypes';
import roles from 'src/constants/roles';
import CErrorMessage from 'src/components/error/CErrorMessage';
function AddEditUser() {
    const editorRef = useRef(null);
    const formikRef= useRef(null);
    const history= useHistory();
    const [userObj,setUserObj]=useState({'name':'','role':roles.EDITOR,'userid':''});
    const [submitError,setSubmitError]=useState("");
    const search = useLocation().search;
    const userId = new URLSearchParams(search).get('id');

    let initValues={
        'name':userObj['name'],
        'role':userObj['role'],
        'userid':userObj['userid'],
    };
    useEffect(()=> {
        if(userId){
            console.log("id is "+userId);
            resourceService.getById(resourcetypes.USER,userId).then((userItem)=> {
                console.log(userItem);
                setUserObj(userItem);
            })
            .catch((err)=> {
                console.log(err);
            })
        }
        else{
            console.log("id is null");
        }
    },[]);
    let validationSchema={};
    if(userId)
    {
        validationSchema=Yup.object({
        name:Yup.string().required("Required"),
        userid:Yup.string().required("user id is required"),
        re_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        });
    }
    else{
        validationSchema = Yup.object({
        name:Yup.string().required("Required"),
        userid:Yup.string().required("user id is required"),
        password:Yup.string().required("password is required"),
        re_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        });
    }     
    
    const handleOnSubmit=(values)=>{
        console.log("handle on submit called");
        setSubmitError("");
        if(userId)
        {
            console.log("updating user details: "+userId);
            resourceService.update(resourcetypes.USER,userId,values).then(()=>{
                window.alert("user updated");
                history.push("/users");
            })
            .catch((err)=>{
                console.log(err);
                setSubmitError("Unable to update user.")
            })
        }
        else{
            resourceService.create(resourcetypes.USER, values).then(()=>{
                window.alert("user created");
                history.push("/users");
            })
            .catch((err)=> {
                console.log(err);
                setSubmitError("unable to create user")
            })
        }
    }

  return (
    <div>
        <h2>Add User</h2>
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
                <CContainer>
                <CRow>
                <CCol md={3}>
                <CFormLabel>Name</CFormLabel><br/>
                <Field name="name" className="form-input" type="text"/><br/>
                <CErrorMessage name="name"/>
                </CCol>
                <CCol md={3}>
                <CFormLabel>User Id</CFormLabel><br/>
                <Field name="userid" className="form-input" type="text"
                 disabled={(userId && true)}
                />
                <br/>
                <CErrorMessage name="userid"/>
                </CCol>
                <CCol md={3}>
                <CFormLabel>User Role</CFormLabel><br/>
                <Field name="role" as="select">
                   <option value="Editor">Editor</option>
                   <option value="Admin">Admin</option>
                   <option value="Demo">Demo</option>
                </Field>
                </CCol>
                </CRow>
            
                <CRow className="mt-3">
                    <CCol md={3}>
                      <CFormLabel>Password</CFormLabel><br/>
                      <Field name="password" type="password"></Field>  
                      <CErrorMessage name="password"/>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Re-Enter Password</CFormLabel><br/>
                      <Field name="re_password" type="password"></Field>  
                      <CErrorMessage name="re_password"/>
                    </CCol>
                
                </CRow>
                <br/>
             
                <CButton type="submit">Save</CButton><br/>
                {(submitError && (
                    <p style={{color:"red"}}>{submitError}</p>
                ))}
                </CContainer>
            </Form>
        </Formik>

    </div>
  )
};
export default AddEditUser;