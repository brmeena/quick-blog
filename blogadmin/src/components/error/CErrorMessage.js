import { ErrorMessage } from "formik"
import React from "react"
const CErrorMessage = (props) =>{
    return (
        <>
        <ErrorMessage {...props} >
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
        </ErrorMessage>
        </>
    )
}

export default CErrorMessage;
