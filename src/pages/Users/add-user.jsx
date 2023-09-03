import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../layouts/index';
import Notifications from '../../utils/notifications';
import {Row,Col} from 'react-bootstrap';
import {useHistory,Link} from 'react-router-dom';
import API_URL from '../../utils/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';

toast.configure({
    autoClose: 8000,
    draggable: false,
    });

const AddUser =()=>{

const history = useHistory();
const [loading, setloading] = useState(false);

return (

<Layout>
   
    <Row>
        <Col lg={6} md={6} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/users" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Add User</h6>
            </div>
            <div className="card-body">
                <div className="p-3">
                <Formik
                initialValues={{
                    emailphone: '',
                    password: '',
                   
                }}
                validationSchema={Yup.object().shape({
                    emailphone: Yup.string()
                        .required('Email or Password is required'),
                        password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required')
                })}
                onSubmit={fields => {
                    setloading(true);
            fetch(API_URL.url+'/register', {
            method: "POST",
            headers: {
                "Origin": "*",               
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`
            },
            body: JSON.stringify({
                
                "login": fields.emailphone,
                "password": fields.password,
                
                
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setloading(false);
                    history.push('/users');
                    toast.success(`${Notifications.useraddedsuccess}`, {
                        position: toast.POSITION.TOP_RIGHT      });
                },
                (error) => {

                    toast.success(`${Notifications.failedrecheck}`, {
                        position: toast.POSITION.TOP_RIGHT      });
                   
                }
            )
                }}
                render={({ errors, status, touched }) => (

                    <Form className="user">
                       
                        <div className="form-group">
                            <label htmlFor="emailphone">Email / Phone</label>
                            <Field name="emailphone" type="text" className={'form-control-user form-control' + (errors.emailphone && touched.emailphone ? ' is-invalid' : '')} />
                            <ErrorMessage name="emailphone" component="div" className="invalid-feedback" />
                        </div>                      
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control-user form-control' + (errors.password && touched.password ? ' is-invalid' : '')} >

                            </Field>
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                       
                        <div className="form-group mb-0">
                            <button type="submit" disabled={loading} className="btn-user btn-block btn btn-primary">Register</button>
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

export default AddUser;