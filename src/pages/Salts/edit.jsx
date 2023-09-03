import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import {Row,Col,Form,Button} from 'react-bootstrap';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import { useLocation, useHistory, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
autoClose: 8000,
draggable: false,
});

const EditSalt =(props)=>{

    const history = useHistory();
    const {state} = useLocation();
    const [id,setId] = useState('');
    const [loading,setloading] = useState(false);
    const [prloading,setprloading] = useState(false);
    const [salt_name,setSalt_name] = useState('');
    const [description,setDescription] = useState('');


    useEffect(() => {
        
        const Datafetch=async()=>{

            await fetch(API_URL.url+"/salt", {
                method: "POST",
                headers: {
                    "Origin": "*",               
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`             
                   
                },
                body: JSON.stringify({
                    "id": props.location.state,
                    "resource": "salts",
                    "method": "GET"
                    })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                       
                        setId(result.id);
                       
                        setSalt_name(result.name);
                        setDescription(result.description);
                        
                    },
            
                )
                setloading(true);
        }

        Datafetch();
      

          
                
        
        },[])

        const fldChange=()=>{

            setloading(true)
        }

      
        const handleUpdate = async (e) => {
            e.preventDefault();
            setprloading(true);
            await fetch(API_URL.url+`/salt`, {
                method: "PUT",
                headers: {
                    "Origin": "*",               
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`             
                   
                },
                body: JSON.stringify({
                    "id": `${id}`,
                    "name": salt_name,
                    "description": description,                   
                    "resource": "salts",
                    "method": "UPDATE"
                })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                       
                       
                        if(Object.prototype.hasOwnProperty.call(result, 'error')) {
                            toast.error(`${result["error"]["message"]}`, {
                            position: toast.POSITION.TOP_RIGHT });
                     
                     } else {
                        setprloading(false);
                         history.push('/salts');
                         toast.success(`${Notifications.addedsuccess}`, {
                     position: toast.POSITION.TOP_RIGHT });
                     }
                    }
                )
       
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
                <h6 className="m-0 font-weight-bold text-primary">Edit Salt</h6>
            </div>
            <div className="card-body">
            {loading ? <>  <Form className="user"  onSubmit={handleUpdate}>
            

                 

                    <div className="row">

                    <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                           <label>Salt name</label>
                           <input name="name" onFocus={fldChange } type="text" value={salt_name} onChange={e=>setSalt_name(e.target.value)} className={'form-control-user form-control'} />
                          
                       </div>                      
                     
                       <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                           <label >Description</label>
                           <textarea  name="description" value={description} onChange={e=>setDescription(e.target.value)}  className={'form-control-textarea form-control'} rows="4" />

                       </div>  
                       

                     
                    </div>

                    <Button variant="primary" disabled={prloading} type="submit" className="btn-user btn-block">
                        Update
                    </Button>
                    {
                                prloading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }

                </Form> </> : <div className="prloader"><Spinner animation="border" variant="primary" /></div>}
               

            </div>
        </div>

        </Col>
    </Row>


</Layout>

)
}

export default EditSalt;