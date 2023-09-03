import { useState,useEffect } from 'react';
import {  toast } from 'react-toastify';
import {Row,Col,Form} from 'react-bootstrap';
import {useLocation,useHistory,Link} from 'react-router-dom';
import API_URL from '../../utils/api';
import {getrolebsx} from '../../utils/common';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import Spinner from 'react-bootstrap/Spinner';
import { MultiSelect } from "react-multi-select-component";



toast.configure({
autoClose: 8000,
draggable: false,
});

const AddEmployee =()=>{

const {state} = useLocation();
const history = useHistory();
const [loading, setloading] = useState(false);
const [roles, setroles] = useState([]);
const [cityname,setCityname] = useState('');
const [salary,setSalary] = useState('');
const [contractstartdate,setContractstartdate] = useState('');
const [contractenddate,setContractenddate] = useState('');
const [selectedOptions,setSelectedOptions] = useState([]);
const [selectedFOptions,setSelectedFOptions] = useState([]);


useEffect(() => {
    fetchData();
}, [])



const fetchData = async() => {
   
      await fetch(API_URL.url+'/roles', {
    
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({

        "resource": "roles",
        "method": "GET"
    })
    })
    .then(res => res.json())
    .then(
    (resp) => {
        
       

        let options = [];

        for (const [key,label] of Object.entries(resp.data)) {
            options.push({value:label.id, label:label.name})
        }
    
          setroles(options);


    },
    (error) => {
    }
    )
    
    }


    const formSubmit=(e)=>{
        e.preventDefault();

        setloading(true);


        if(salary!==""&&cityname!==""){

            fetch(API_URL.url+'/employee', {
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`

    },
    body: JSON.stringify({
    "user_id": state.userid,
    "city": cityname,
    "salary": salary,
    "contract_begin_date": contractstartdate,
    "contract_end_date": contractenddate,
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
if(selectedOptions!==""){

            let options = [];

            for (const [key,value] of Object.entries(selectedOptions)) {
                options.push(value.value)
            }

            setSelectedFOptions(options);

        

    fetch(API_URL.url+'/user-role', {
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`

    },
    body: JSON.stringify({
    "user_id": state.userid,
    "roles": options,
    "resource": "user_roles",
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
                <h6 className="m-0 font-weight-bold text-primary">Assign Role</h6>
            </div>
            <div className="card-body">
                <div className="p-3">


               

                        <Form className="user" onSubmit={formSubmit}>
                        <div className="form-group">
                            <label htmlFor="city">Select Role</label>
                                      
                            <MultiSelect
                                options={roles}
                                value={selectedOptions}
                                onChange={setSelectedOptions}
                                labelledBy="Select"
                            />
                          

                        </div>

                        {(() => {
                            

                            if(getrolebsx(selectedOptions)==="employee"){

                                return(
                                    <>
                                    <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input required name="city" type="text" onChange={e=>setCityname(e.target.value)} className={'form-control-user form-control'} />

                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary</label>
                            <input required name="salary" min="0" type="number" onChange={e=>setSalary(e.target.value)}  className={'form-control-user form-control'} />

                           
                        </div>
                        <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 form-group">
                            <label htmlFor="begin_date">Contract Start Date</label>
                            <input name="begin_date" type="date" onChange={e=>setContractstartdate(e.target.value)} className={'form-control-user form-control'} />

                            
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 form-group">
                            <label htmlFor="end_date">Contract End Date</label>
                            <input name="end_date" type="date" onChange={e=>setContractenddate(e.target.value)} className={'form-control-user form-control' } />

                            
                        </div>
                        </div>   
                                    </>
                                )
                            } else{

                                return(<><span></span></>)
                            }
                           
                                  

                        })()}

                               
                       
                        <div className="form-group mb-0">
                            <button type="submit" className="btn-user btn-block btn btn-primary">Submit</button>
                            {
                                loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                        </div>
                        </Form>
                       
                </div>

            </div>
        </div>

        </Col>
    </Row>

</Layout>

)
}

export default AddEmployee;