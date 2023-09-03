import React,{useState} from 'react';
import {toast } from 'react-toastify';
import {Row,Col} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import { useHistory,Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
autoClose: 8000,
draggable: false,
});

const AddDoses =()=>{

    const history = useHistory();  
    const [loading, setloading] = useState(false);  
    
    const fldChange=()=>{
        setloading(false);
    }
          
return (
<Layout>
   
    <Row>

        <Col lg={6} md={6} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/doses" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Add Dose</h6>
            </div>
            <div className="card-body">
                <div className="p-5">

                <Formik
                initialValues={{
                    name: '',
                    dose_id: '',
                  
                   
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Dose display name is required'),
                    dose_id: Yup.string()
                        .required('Dose short name is required'),
                    
                })}
                onSubmit={fields => {
                    setloading(true);
                    fetch(API_URL.url+'/dose', {
                    method: "POST",
                    headers: {
                        "Origin": "*",               
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${Notifications.token}`             
                       
                    },
                    body: JSON.stringify({
                        "name": fields.name,    
                        "dose_id": fields.dose_id,            
                        "resource": "doses",
                        "method": "POST"
                       
                    })
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                           
                            history.push('/doses');
                            setloading(false);
                            
                            toast.success(`${Notifications.addedsuccess}`, {
                                position: toast.POSITION.TOP_RIGHT      });

                               
                        },
                        (error) => {

                            toast.error(`${Notifications.notaddfailed}`, {
                                position: toast.POSITION.TOP_RIGHT      });
                        }
                    )
                }}
                render={({ errors, status, touched }) => (
                    <Form className="user">
                        <div className="form-group">
                            <label htmlFor="name">Dose <small>(Display name)</small></label>
                            <Field onFocus ={fldChange} name="name" type="text" className={'form-control-user form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dose_id">Dose <small>(Short name)</small></label>
                            <Field onFocus ={fldChange}  name="dose_id" type="text" className={'form-control-user form-control' + (errors.dose_id && touched.dose_id ? ' is-invalid' : '')} />
                            <ErrorMessage name="dose_id" component="div" className="invalid-feedback" />
                        </div>
                      
                        <div className="form-group mb-0">
                            <button type="submit" disabled={loading} className="btn-user btn-block btn btn-primary mb-2">Submit</button>
                            {
                                loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                        </div>


                    </Form>
                )}
            />

                </div>

            </div>
        </div>

        </Col>
    </Row>

</Layout>

)
}

export default AddDoses;