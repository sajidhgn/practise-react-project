import React,{useState}from 'react';
import {  toast } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { NavLink, useHistory } from "react-router-dom";
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Spinner from 'react-bootstrap/Spinner';

const ForgotPsd=()=>{

   
    const [bgimg,setBgimg]=useState('img/login-punch.png');
    const [email,setEmail]=useState('');
    const [loading, setloading] = useState(false);

    const history = useHistory();

    const handleSubmit= async(event)=>{

        event.preventDefault();
        
        setloading(true);
        await fetch(API_URL.url+'/forget',{
            method:"POST",
            headers: {
                "Origin": "*",               
                "Content-Type": "application/json",
                "Accept": "application/json",             
            },
            body: JSON.stringify({
                "email": email,
            })
        }).then((response)=>{
            response.json().then((result)=>{
               
        
                setloading(false);
                history.push('/login');
                toast.success(`Reset password link has sent in your email please check`, {
                    position: toast.POSITION.TOP_RIGHT      });
        
        
            })
        }).catch((error)=>{
           
                toast.error(`Reset password request not sent`, {
                    position: toast.POSITION.TOP_RIGHT      });
        })
        }

    
    return (

        <Container>

        <Row className="justify-content-center">

            <Col xl={10} lg={12} md={9} >

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                      
                        <Row>
                            <Col lg={6}  className="d-none d-lg-block bg-login-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/' +bgimg})`}}></Col>
                            <Col lg={6}>
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                        <p className="mb-4">We get it, stuff happens. Just enter your email address below
                                            and we'll send you a link to reset your password!</p>
                                    </div>
                                   
                                    <Form className="user" onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                           
                                            <Form.Control className="form-control-user" type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} required />
                                          
                                        </Form.Group>

                                       
                                      
                                        <Button variant="primary" disabled={loading} type="submit" className="btn-user btn-block">
                                            Reset Password
                                        </Button>
                                        {
                                loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                                        </Form>
                                     
                                   
                                   <hr/>
                                   
                                    <div className="text-center">
                                        <NavLink className="small" to={process.env.PUBLIC_URL + "/register"}>Create an Account!</NavLink>
                                    </div>
                                    <div className="text-center">
                                        <NavLink className="small" to={process.env.PUBLIC_URL + "/login"}>Already have an account? Login!</NavLink>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Col>

        </Row>

    </Container>


    )
}

export default ForgotPsd;