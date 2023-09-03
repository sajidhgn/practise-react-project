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

const AddStockType =()=>{

    const history = useHistory();  
    const [loading, setloading] = useState(false);      
          
return (
<Layout>
   
    <Row>

        <Col lg={6} md={6} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/brands" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Add Brand</h6>
            </div>
            <div className="card-body">
                <div className="p-5">

                <Formik
                initialValues={{
                    type: '',
                  
                   
                }}
                validationSchema={Yup.object().shape({
                    type: Yup.string()
                        .required('Brand is required'),
                    
                })}
                onSubmit={fields => {
                    setloading(true);
                    fetch(API_URL.url+'/brand', {
                    method: "POST",
                    headers: {
                        "Origin": "*",               
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${Notifications.token}`             
                       
                    },
                    body: JSON.stringify({
                        "name": fields.type,                      
                        "resource": "brands",
                        "method": "POST"
                       
                    })
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                           
                            history.push('/brands');

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
                            <label htmlFor="type">Brand</label>
                            <Field name="type" type="text" className={'form-control-user form-control' + (errors.type && touched.type ? ' is-invalid' : '')} />
                            <ErrorMessage name="type" component="div" className="invalid-feedback" />
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

export default AddStockType;