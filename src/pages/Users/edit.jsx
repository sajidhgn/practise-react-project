import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {Row,Col,Form,Button} from 'react-bootstrap';
import {useHistory, useLocation,Link} from 'react-router-dom';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import Spinner from 'react-bootstrap/Spinner';

toast.configure({
autoClose: 8000,
draggable: false,
});

const EditEmployee =(props)=>{

const {state} = useLocation();
const history = useHistory();
const [loading,setloading] = useState(false);
const [id,setId] = useState('');
const [salary,setSalary] = useState('');
const [city,setCity] = useState('');
const [contract_begin_date,setContract_begin_date] = useState('');
const [contract_end_date,setContract_end_date] = useState('');
const [roles,setRoles] = useState([]);
const [selectedroles,setSelectedroles] = useState([]);
const [rolecheck,setRolecheck] = useState([]);

useEffect(() => {
       
    fetchData();

    },[])





    const fetchData = async () => {
    
        await fetch(API_URL.url+"/employee", {
             method: "POST",
             headers: {
                 "Origin": "*",               
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                 "Authorization": `Bearer ${Notifications.token}`             
                
             },
             body: JSON.stringify({
                 "id": state.empid,
                 "resource": "employees",
                "method": "GET",
                
                 })
         })
             .then(res => res.json())
             .then(
                 (result) => {
                  
                    
                     setId(result.id);
                     setSalary(result.salary);
                     setCity(result.city);
                     setContract_begin_date(result.contract_begin_date);
                     setContract_end_date(result.contract_end_date);  
                     
                   
                 }
             )
             setloading(true);
         }      
         
         

        //  Update data function

    const handleUpdate = async (e) => {
        e.preventDefault();

       
          await  fetch(API_URL.url+`/employee`, {
                method: "PUT",
                headers: {
                    "Origin": "*",               
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`             
                   
                },
                body: JSON.stringify({
                    "id": id,
                    "resource": "employees",
                    "method":"UPDATE",
                    "salary": salary,
                    "city": city,
                    "contract_begin_date": contract_begin_date,
                    "contract_end_date": contract_end_date,
                })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                       
                        if(Object.prototype.hasOwnProperty.call(result, 'error')) {
                            toast.error(`${result["error"]["message"]}`, {
                            position: toast.POSITION.TOP_RIGHT });
                     
                     } else {
                         history.push('/users');
                         toast.success(`${Notifications.updatedsuccess}`, {
                            position: toast.POSITION.TOP_RIGHT      });
                     }
                      
                    }
                   
                )

           

        

       
   
    }



    // Add Employee Data

    const addemployeeData= async ()=>{


        await fetch(API_URL.url+'/employee', {
            method: "POST",
            headers: {
            "Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Notifications.token}`
        
            },
            body: JSON.stringify({
            "user_id": id,
            "city": city,
            "salary": salary,
            "contract_begin_date": contract_begin_date,
            "contract_end_date": contract_end_date,
            "resource": "employees",
            "method": "POST"
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
            history.push('/users');
            toast.success(`${Notifications.addedsuccess}`, {
            position: toast.POSITION.TOP_RIGHT });
        }
            }
            )
    }
    
   
   


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
                <h6 className="m-0 font-weight-bold text-primary">Edit Assign Role</h6>
            </div>
            <div className="card-body">
                <div className="p-3">
                {loading ? <>   <Form className="user" onSubmit={handleUpdate}>

               
                                    <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control className="form-control-user" name='city' value={city} onChange={e=>setCity(e.target.value)}
                                    type="text" placeholder="Enter city name" required />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control className="form-control-user" name='salary' value={salary} onChange={e=>setSalary(e.target.value)}
                                    type="number" min="0" placeholder="Enter Salary" required />

                                </Form.Group>

                                <Row>
                                <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                    <Form.Control className="form-control-user" name='contract_begin_date' value={contract_begin_date} onChange={e=>
                                        setContract_begin_date(e.target.value)}
                                        type="date" placeholder="Enter contract start date" />

                                </Form.Group>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                    <Form.Control className="form-control-user" name='contract_end_date' value={contract_end_date} onChange={e=>
                                        setContract_end_date(e.target.value)}
                                        type="date" placeholder="Enter contract end date" />

                                </Form.Group>
                                </Col>
                                </Row>

                        <Button variant="primary" type="submit" className="btn-user btn-block">
                            Update
                        </Button>
                    </Form> </> : <div className="prloader"><Spinner animation="border" variant="primary" /></div>}
                  

                </div>

            </div>
        </div>

        </Col>
    </Row>

</Layout>

)
}

export default EditEmployee;