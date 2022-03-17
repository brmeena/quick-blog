import { CButton, CFormLabel } from '@coreui/react';
import { ErrorMessage, Field, Formik } from 'formik';
import { Form } from 'formik';
import React,{useRef,useEffect, useState} from 'react';
import * as Yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import resourceservice from 'src/services/resourceservice';
import resourcetypes from 'src/constants/resourcetypes';
function AddBlogPost() {
    const editorRef = useRef(null);
    const formikRef= useRef(null);
    const history= useHistory();
    const [postObj,setPostObj]=useState({'title':'','description':'','content':''});
    const search = useLocation().search;
    const postId = new URLSearchParams(search).get('id');
    const uploadImageApi=`${process.env.REACT_APP_API_URL}/api/services/upload/image`

    let initValues={
        'title':postObj['title'],
        'description':postObj['description'],
        'content':postObj['content'],
    };
    useEffect(()=> {
        if(postId){
            console.log("id is "+postId);
            resourceservice.getById(resourcetypes.BLOG_POST,postId).then((postItem)=> {
                console.log(postItem);
                setPostObj(postItem);
            });
        }
        else{
            console.log("id is null");
        }
    },[]);
    const validationSchema=Yup.object({
        title:Yup.string().required("Required")
    });
    const handleOnSubmit=(values)=>{
        console.log("handle on submit called");
        if (editorRef.current) {
            values['content']=editorRef.current.getContent();
        }
        console.log(values);
        if(postId)
        {
            console.log("updating blog post: "+postId);
            resourceservice.update(resourcetypes.BLOG_POST, postId,values).then(()=>{
                window.alert("post updated");
                history.push("/blogposts");
            })
        }
        else{
            resourceservice.create(resourcetypes.BLOG_POST,values).then(()=>{
                window.alert("post created");
                history.push("/blogposts");
            })
        }
    }

  return (
    <div>
        <h2>Add Blog Post</h2>
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
                <CFormLabel>Blog title</CFormLabel><br/>
                <Field name="title" className="form-input" type="text" size="80"/>
                <ErrorMessage name="title"/>
                </div><br/>
                <div className='form-group'>
                <CFormLabel>Blog Description</CFormLabel><br/>
                <Field name="description" className="form-input" as="textarea" cols="80" rows="2"/>
                <ErrorMessage name="description"/>
                </div><br/>
                <div className='form-group'>
                <CFormLabel>Blog Content</CFormLabel><br/>
                <Editor
                name="content" 
                tinymceScriptSrc="tinymce/js/tinymce/tinymce.min.js"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={postObj.content}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist autolink textcolor lists link charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime table paste code help wordcount image'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                  'bold italic forecolor backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent |image ',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  images_upload_url: uploadImageApi,
                  automatic_uploads: true,
                }}>
                </Editor>
                </div>
                <br/>
                <CButton type="submit">Save</CButton>
                
            </Form>
        </Formik>

    </div>
  )
};
export default AddBlogPost;