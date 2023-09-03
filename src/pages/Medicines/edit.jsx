import React, { useState, useEffect, Fragment } from 'react'
import { toast } from 'react-toastify';
import {Row,Col} from 'react-bootstrap';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import {useHistory, Link, useLocation} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import SaltList from '../Salts';


toast.configure({
autoClose: 8000,
draggable: false,
});


const EditMedicine =(props)=>{

const [entity_typeid,setEntity_typeid] = useState(0);

const [entity_type_list,setEntity_type_list] = useState([]);

const [brand_id_list,setBrand_id_list] = useState([]);

const [unit_id_list,setUnit_id_list] = useState([]);
const [loading, setloading] = useState(false);
const [prloading, setprloading] = useState(false);
 const [salt_id_list,setSalt_id_list] = useState([]);

const [dose_id_list,setDose_id_list] = useState([]);

// Edit Fields

const [medicine_id,setMedicine_id] = useState('');
const [medicine_name,setMedicine_name] = useState('');
const [entity_type_id,setEntity_type_id] = useState('');
const [brand_id,setBrand_id] = useState('');

const history = useHistory();
const {state} = useLocation();

useEffect(() => {

    fetchEntityTypeList();
    fetchBrandsList();
    fetchUnitsList();
    fetchSaltsList();
    fetchDoseList();
    fetchMedicinesList();


},[]);



const fetchMedicinesList = async () => {
    setprloading(true);

    await fetch(API_URL.url+'/medicine', {
   method: "POST",
   headers: {
   "Origin": "*",
   "Content-Type": "application/json",
   "Accept": "application/json",
   "Authorization": `Bearer ${Notifications.token}`
   },
   body: JSON.stringify({
        "id": props.location.state,
       "resource": "medicines",
       "method": "GET"
       })
   })
   .then(res => res.json())
   .then(
   (response) => {

    setprloading(false);
      
    setMedicine_id(response.id)
    setMedicine_name(response.name)
    setEntity_type_id(response.entity_type_id)
    setBrand_id(response.brand_id)

  

   },
   (error) => {
   
   }
   )
   
   }


// Entity Type List

const fetchEntityTypeList = async () => {
    await fetch(API_URL.url+'/entity-types', {
   method: "POST",
   headers: {
   "Origin": "*",
   "Content-Type": "application/json",
   "Accept": "application/json",
   "Authorization": `Bearer ${Notifications.token}`
   },
   body: JSON.stringify({
       "resource": "entity_types",
       "method": "GET"
       })
   })
   .then(res => res.json())
   .then(
   (response) => {
       setEntity_type_list(response.data);
   },
   (error) => {
   
   }
   )
   
   }


   // Brands List

const fetchBrandsList = async () => {
    await fetch(API_URL.url+'/brands', {
   method: "POST",
   headers: {
   "Origin": "*",
   "Content-Type": "application/json",
   "Accept": "application/json",
   "Authorization": `Bearer ${Notifications.token}`
   },
   body: JSON.stringify({
       "resource": "brands",
       "method": "GET"
       })
   })
   .then(res => res.json())
   .then(
   (response) => {
    setBrand_id_list(response.data);
   },
   (error) => {
   
   }
   )
   
   }


      // Units List

const fetchUnitsList = async () => {
    await fetch(API_URL.url+'/units', {
   method: "POST",
   headers: {
   "Origin": "*",
   "Content-Type": "application/json",
   "Accept": "application/json",
   "Authorization": `Bearer ${Notifications.token}`
   },
   body: JSON.stringify({
       "resource": "units",
       "method": "GET"
       })
   })
   .then(res => res.json())
   .then(
   (response) => {
    setUnit_id_list(response.data);
   },
   (error) => {
   
   }
   )
   
   }

// Salts List

const fetchSaltsList = async () => {
    await fetch(API_URL.url+'/salts', {
   method: "POST",
   headers: {
   "Origin": "*",
   "Content-Type": "application/json",
   "Accept": "application/json",
   "Authorization": `Bearer ${Notifications.token}`
   },
   body: JSON.stringify({
       "resource": "salts",
       "method": "GET"
       })
   })
   .then(res => res.json())
   .then(
   (response) => {
    setSalt_id_list(response.data);
   },
   (error) => {
   
   }
   )
   
   }



// Dose List

const fetchDoseList = async () => {
    await fetch(API_URL.url+'/doses', {
   method: "POST",
   headers: {
   "Origin": "*",
   "Content-Type": "application/json",
   "Accept": "application/json",
   "Authorization": `Bearer ${Notifications.token}`
   },
   body: JSON.stringify({
       "resource": "doses",
       "method": "GET"
       })
   })
   .then(res => res.json())
   .then(
   (response) => {
    setDose_id_list(response.data);
   },
   (error) => {
   
   }
   )
   
   }



const fldChange=()=>{

    setloading(false);

}


// Medicines Update Function

const handleUpdate = async (e) => {
    e.preventDefault();
    setloading(true);
    await fetch(API_URL.url+`/medicine`, {
        method: "PUT",
        headers: {
            "Origin": "*",               
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Notifications.token}`             
           
        },
        body: JSON.stringify({
            "id": `${medicine_id}`,
            "name": medicine_name,           
            "entity_type_id": entity_type_id,
            "brand_id": brand_id,
            "resource": "medicines",
            "method": "UPDATE",
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
                 history.push('/active-medicines');
                 toast.success(`${Notifications.addedsuccess}`, {
             position: toast.POSITION.TOP_RIGHT });
             }
            }
        )

        }



return (
<Layout>
    
    <Row>

        <Col lg={6} md={8} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/active-medicines" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Edit Medicine</h6>
            </div>
            <div className="card-body">

            <div className="p-4">
            { prloading? <>  
                <div className="prloader"><Spinner animation="border" variant="primary" className="mt-3" /></div>
           </>
  :   <form className="user" onSubmit={handleUpdate}>
  <div className="row">
             <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                 <label htmlFor="name">Name</label>
                 <input name="name" type="text" onFocus={fldChange} onChange={e=>setMedicine_name(e.target.value)} value={medicine_name}  className={'form-control-user form-control'} />
                 
             </div>     


             <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                 <label htmlFor="stocktype">Medicine Type</label>
                
                 <select onFocus={fldChange}  onChange={e=>setEntity_type_id(e.target.value)} value={entity_type_id}  name="entity_type_id" className={'form-control-user form-control'}>
                 <option defaultValue={entity_typeid}>Select Medicine Type</option>                           
                      {entity_type_list.map((stock,i)=>(<option key={i} value={stock.id}>
                          {stock.name}</option>))}
                 </select>
               
             </div>     
                  
           
          

             <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                 <label htmlFor="stocktype">Brands</label>
                
                 <select onFocus={fldChange} onChange={e=>setBrand_id(e.target.value)} value={brand_id} name="brand_id" className={'form-control-user form-control'}>
                 <option defaultValue={entity_typeid}>Select Brand</option>                           
                      {brand_id_list.map((stock,i)=>(<option key={i} value={stock.id}>
                          {stock.name}</option>))}
                 </select>
                
             </div>  
      
             </div>   

            
             <div className="row">   
             <div className="form-group mt-2 mb-0 col-lg-4 col-md-6 col-sm-12 col-12">
                 <button type="submit" disabled={loading} className="btn-user btn-block btn btn-primary mb-2">Submit</button>
                 {
                      loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                  }
             </div>
             </div>      
            

         </form>
            }


   </div>
            </div>
        </div>

        </Col>
    </Row>

    {/* <pre>
          {JSON.stringify(inputFields, null, 2)}
        </pre> */}
  

</Layout>

)
}

export default EditMedicine;