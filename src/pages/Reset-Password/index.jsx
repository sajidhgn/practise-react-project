import React,{useState,useEffect}from 'react';
import { toast } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { NavLink, useParams,useHistory } from "react-router-dom";
import { getToken } from '../../utils/common';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Spinner from 'react-bootstrap/Spinner';

const ForgotPsd=()=>{

    const params = useParams();
   
    const [bgimg,setBgimg]=useState('img/login-punch.png');
    const [newpassword,setNewpassword]=useState('');
    const [confirmpassword,setConfirmpassword]=useState('');
    const [loading, setloading] = useState(false);

    const history = useHistory();
    
    let prid = params.id;
    const id = prid.replace(':','');


    useEffect(() => {
    
        if(getToken("token")){
    
            history.push('/dashboard');
        } else{
            history.push('/reset');
        }
    
    }, [])


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
                "id":id,
                "password": newpassword
            })
        }).then((response)=>{
            response.json().then((result)=>{
               
                setloading(false);
                toast.success(`${Notifications.resetpass}`, {
                    position: toast.POSITION.TOP_RIGHT      });
        
        
            })
        }).catch((error)=>{
           
                toast.error(`${Notifications.notpasswordsame}`, {
                    position: toast.POSITION.TOP_RIGHT      });
        })
        }

        const changepassword=(e)=>{

            setloading(false);

            setNewpassword(e.target.value);

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
                                        <h1 className="h4 text-gray-900 mb-4">Reset Your Password?</h1>
                                       
                                    </div>
                                   
                                    <Form className="user" onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                           
                                            <Form.Control className="form-control-user" type="password" placeholder="Enter new password" onChange={(e)=>changepassword(e)} required />
                                          
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