import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import { getToken } from '../../utils/common';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { NavLink, Redirect,useHistory } from 'react-router-dom';
import API_URL from '../../utils/api';
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
    autoClose: 8000,
    draggable: false,
});


const Register =()=>{

    const [bgimg,setBgimg] = useState('img/registerimg.png');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('');
    const [roleid,setRoleid] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [loading, setloading] = useState(false);

    const history = useHistory();

    
useEffect(() => {

    if(getToken("token")){

        history.push('/dashboard');
    } else{
        history.push('/register');
    }

}, [])

const changeEmail=(e)=>{

    setloading(false);
    setEmail(e.target.value)
}


    const submit = async (e) => {
        e.preventDefault();

        setloading(true);
        await fetch(API_URL.url+'/register', {
            method: "POST",
            headers: {
                "Origin": "*",               
                "Content-Type": "application/json",
                "Accept": "application/json",             
               
            },
            body: JSON.stringify({
                "name": name,
                "login": email,
                "password": password,
                "gender": gender,
                "role_id": roleid,
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    history.push('/login');
                    setloading(false);
                    toast.success(`${Notifications.regsuccess}`, {
                        position: toast.POSITION.TOP_RIGHT      });
                },
                (error) => {
                    toast.error(`${Notifications.regerror}`, {
                        position: toast.POSITION.TOP_RIGHT      });
                }
            )

    }

   
  

    return (
        
        <Container>
       <ToastContainer />
        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">


                
                <Row>
                    <Col lg={5} className=" d-none d-lg-block bg-register-image"  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/' + bgimg})`}}></Col>
                    <Col lg={7}>
                    <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                   
                                    <Form className="user" onSubmit={submit} method="POST">
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                           
                                           <Form.Control className="form-control-user" type="text" placeholder="Enter Name" onChange={e=>setName(e.target.value)} required />
                                         
                                       </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                           
                                           <Form.Control className="form-control-user" type="text" placeholder="Enter email / phone" onChange={e=>changeEmail(e)} required/>
                                         
                                       </Form.Group>

                                       <Form.Group className="mb-3" controlId="formBasicPassword">
                                           
                                           <Form.Control className="form-control-user" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}required />
                                       </Form.Group>
                                      

                                       <div className="form-group">
                                           <select name="gender" id="gender" className="form-control-user form-control" onChange={e=>setGender(e.target.value)} required>
                                           <option hidden>Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                           </select>
                                       </div>
                                       
                                       <div className="form-group">
                                           <select name="role_id" id="role_id" className="form-control-user form-control" onChange={e=>setRoleid(e.target.value)} required>
                                           <option hidden>Role</option>
                                            <option value="customer">Customer</option>
                                            <option value="provider">Provider</option>
                                           </select>
                                       </div>
                                      
                                      
                                        <Button variant="primary" disabled={loading} type="submit" className="btn-user btn-block">
                                            Register
                                        </Button>
                                        {
                                loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                                        </Form>
                                     
                                   
                                   <hr/>
                                    <div className="text-center">
                                        <NavLink className="small" to={process.env.PUBLIC_URL + "/forgot-password"}>Forgot Password?</NavLink>
                                    </div>
                                    <div className="text-center">
                                        <NavLink className="small" to={process.env.PUBLIC_URL + "/login"}>Already have an account?</NavLink>
                                    </div>
                                </div>
                    </Col>
                </Row>
            </div>
        </div>

    </Container>


    )
}

export default Register;