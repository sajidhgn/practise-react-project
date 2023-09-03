import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import {Row,Col} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import {useHistory,Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
autoClose: 8000,
draggable: false,
});


const AddSalt =()=>{

const [loading, setloading] = useState(false)

const history = useHistory();

const fldChange=()=>{
    setloading(false)
}

return (
<Layout>
    
    <Row>

        <Col lg={7} md={7} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/salts" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Add Salt</h6>
            </div>
            <div className="card-body">


            <Formik
                initialValues={{
                    name: '',
                    description: '',
                   
                   
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Salt name is required'),
                
                })}
                onSubmit={async fields => { 
                    setloading(true);
                    await fetch(API_URL.url+'/salt', {
                    method: "POST",
                    headers: {
                    "Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`

                    },
                    body: JSON.stringify({
                    "name": fields.name,
                    "description": fields.description,               
                    "resource": "salts",
                    "method": "POST",
                    })
                    })
                    .then(res => res.json())
                    .then(
                    (result) => {

    if(Object.prototype.hasOwnProperty.call(result, 'error')) {
       toast.error(`${result["error"]["message"]}`, {
       position: toast.POSITION.TOP_RIGHT });

} else {
    setloading(false);
    history.push('/salts');
    toast.success(`${Notifications.addedsuccess}`, {
position: toast.POSITION.TOP_RIGHT });
}


}
)

                }}
                >
               {props => {
        const {
          touched,
          errors,
         
        } = props;
        return (

            <Form className="user">
            <div className="row p-4">
                       
                       <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                           <label htmlFor="name">Salt name</label>
                           <Field name="name" onFocus={fldChange } type="text" className={'form-control-user form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                           <ErrorMessage name="name" component="div" className="invalid-feedback" />
                       </div>                      
                     
                       <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                           <label htmlFor="description">Description</label>
                           <Field as="textarea" onFocus={fldChange } name="description"  className={'form-control-textarea form-control'} rows="4" />

                       </div>  
                       
                        
                       <div className="form-group mb-0 col-lg-12 col-md-12 col-sm-12 col-12">
                           <button type="submit" disabled={loading} className="btn-user btn-block btn btn-primary mb-2">Submit</button>
                           {
                                loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                       </div>
                       </div>   
                   </Form>
);
     }}
   </Formik>

               
            </div>
        </div>

        </Col>
    </Row>

</Layout>

)
}

export default AddSalt;