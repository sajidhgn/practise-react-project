import React, { useState, useEffect, Fragment } from 'react'
import { toast } from 'react-toastify';
import {Row,Col} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import {useHistory,Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
autoClose: 8000,
draggable: false,
});


const AddMedicine =()=>{

const [entity_typeid,setEntity_typeid] = useState(0);
const [entity_type_id,setEntity_type_id] = useState('');
const [entity_type_list,setEntity_type_list] = useState([]);
const [brand_id,setBrand_id] = useState('');
const [brand_id_list,setBrand_id_list] = useState([]);
const [unit_id,setUnit_id] = useState('');
const [unit_id_list,setUnit_id_list] = useState([]);
const [loading, setloading] = useState(false);
const [inputFields, setInputFields] = useState([{ salt_id: '', dose_id: '', quantity: '' }]);
 const [salt_id_list,setSalt_id_list] = useState([]);

const [dose_id_list,setDose_id_list] = useState([]);

const history = useHistory();

useEffect(() => {

    fetchEntityTypeList();
    fetchBrandsList();
    fetchUnitsList();
    fetchSaltsList();
    fetchDoseList();

},[]);


console.log(inputFields)


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


const onchangefun=(e)=>{

    setEntity_type_id(e.target.value)
}

const onchangebrands=(e)=>{

    setBrand_id(e.target.value)

}

const onchangeunits=(e)=>{

    setUnit_id(e.target.value)

}

const fldChange=()=>{

    setloading(false);

}

// Clone Form Scripts

const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ salt_id: '', dose_id: '', quantity: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "salt_id") {
      values[index].salt_id = event.target.value;
    } else if(event.target.name === "dose_id"){
      values[index].dose_id = event.target.value;
    } else{
        values[index].quantity = event.target.value;
    }

    setInputFields(values);
  };


return (
<Layout>
    
    <Row>

        <Col lg={12} md={12} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/active-medicines" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Add Medicine</h6>
            </div>
            <div className="card-body">

            <div className="p-4">
            <Formik
                initialValues={{
                    name: '',
                    units_per_strip: '',
                    strips_per_pack: '',
                    price_per_pack: '',                  
                    salt: ''
                  
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Medicine name is required'),                  
                    price_per_pack: Yup.string()
                        .required('Price per pack is required'),
                       
                })}
                onSubmit={async fields => { 
                    setloading(true);
                    await fetch(API_URL.url+'/medicine', {
                    method: "POST",
                    headers: {
                    "Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`

                    },
                    body: JSON.stringify({
                    "name": fields.name,
                             
                    "units_per_strip": fields.units_per_strip,
                    "strips_per_pack": fields.strips_per_pack,
                    "price_per_pack": fields.price_per_pack,
                    "unit_id": unit_id,
                    "entity_type_id": entity_type_id,
                    "brand_id": brand_id,
                    "salts": inputFields,
                    "resource": "medicines",
                    "method": "POST",
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

                }}
                >
               {props => {
        const {
          touched,
          errors,
          
        } = props;
        return (

            <Form className="user">
            <div className="row">
                       <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                           <label htmlFor="name">Name</label>
                           <Field name="name" type="text" onFocus={fldChange}  className={'form-control-user form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                           <ErrorMessage name="name" component="div" className="invalid-feedback" />
                       </div>   
                       <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                           <label htmlFor="stocktype">Medicine Type</label>
                          
                           <select  onChange={onchangefun} onFocus={fldChange}  name="entity_type_id" className={'form-control-user form-control'}>
                           <option defaultValue={entity_typeid}>Select Medicine Type</option>                           
                                {entity_type_list.map((stock,i)=>(<option key={i} value={stock.id}>
                                    {stock.name}</option>))}
                           </select>
                         
                       </div>      

                       {(() => {
                            
                            if(entity_type_id==="syrup"||entity_type_id==="syrups"){ 

                             return ('')
                             }
                            else {
                                return (<>
                                    <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                    <label htmlFor="units_per_strip">Units per strip</label>
                    <Field onFocus={fldChange} name="units_per_strip" onFocus={fldChange} type="text" className={'form-control-user form-control'} />
                   
                </div>    
                <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                    <label htmlFor="strips_per_pack">Strip per pack</label>
                    <Field  onFocus={fldChange} name="strips_per_pack" onFocus={fldChange} type="text" className={'form-control-user form-control'} />
                    
                </div>        
                         </>)
                            }
                        
                               
                        })()}

                    
                       <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                           <label htmlFor="price_per_pack">Price per pack</label>
                           <Field onFocus={fldChange} name="price_per_pack" type="text" className={'form-control-user form-control' + (errors.price_per_pack && touched.price_per_pack ? ' is-invalid' : '')} />
                           <ErrorMessage name="price_per_pack" component="div" className="invalid-feedback" />
                       </div>        
                       <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                           <label htmlFor="stocktype">Unit Type</label>
                          
                           <select  onFocus={fldChange} onChange={onchangeunits}  name="unit_id" className={'form-control-user form-control' + (errors.unit_id && touched.unit_id ? ' is-invalid' : '')}>
                           <option defaultValue={entity_typeid}>Select Unit Type</option>                           
                                {unit_id_list.map((stock,i)=>(<option key={i} value={stock.id}>
                                    {stock.name}</option>))}
                           </select>                        
                       </div>
                     
                     
                     

                       <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                           <label htmlFor="stocktype">Brands</label>
                          
                           <select onFocus={fldChange}  onChange={onchangebrands} name="brand_id" className={'form-control-user form-control' + (errors.brand_id && touched.brand_id ? ' is-invalid' : '')}>
                           <option defaultValue={entity_typeid}>Select Brand</option>                           
                                {brand_id_list.map((stock,i)=>(<option key={i} value={stock.id}>
                                    {stock.name}</option>))}
                           </select>
                          
                       </div>  
                       
                       <div className="form-group col-lg-2 col-md-3 col-sm-6 col-6">
                           <label className="text-white">Brands</label>
                          
                          <a href="#updatemodal" className="btn-user btn-block btn btn-secondary" data-toggle="modal" type="button">+ Salt</a>
                       </div>
                       </div>   

                      
                       <div className="row">   
                       <div className="form-group mt-3 mb-0 col-lg-4 col-md-6 col-sm-12 col-12">
                           <button type="submit" disabled={loading} className="btn-user btn-block btn btn-primary mb-2">Submit</button>
                           {
                                loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                       </div>
                       </div>      
                      

        <div className="modal fade" id="updatemodal">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">

                <div className="row ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card shadow mb-0">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Add Salts</h6>
                                
                              

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
                            </div>
                            <div className="card-body">
                            <div className="p-4">

                            
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
                <div className="form-row">
             <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                           <label htmlFor="saltid">Salt name</label>
                          
                           <select onFocus={fldChange} name="salt_id" id="salt_id"  value={inputField.salt_id}
                  onChange={event => handleInputChange(index, event)}  className={'form-control-user form-control'}>
                           <option defaultValue={entity_typeid}>Select Salt</option>                           
                                {salt_id_list.map((stock,i)=>(<option key={i} value={stock.id}>
                                    {stock.name}</option>))}
                           </select>
                          
                       </div>
             
              <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                <label htmlFor="dose_id">Dose name</label>
                <select onFocus={fldChange} name="dose_id" id="dose_id"  value={inputField.dose_id}
                  onChange={event => handleInputChange(index, event)}  className={'form-control-user form-control'}>
                           <option defaultValue={entity_typeid}>Select Dose</option>                           
                                {dose_id_list.map((stock,i)=>(<option key={i} value={stock.id}>
                                    {stock.name}</option>))}
                           </select>
              </div>
              <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text" onFocus={fldChange} 
                  className="form-control-user form-control" 
                  id="quantity"
                  name="quantity"
                  value={inputField.quantity}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <button
                  className="btn btn-link text-danger p-0 bxd"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  <i class="rs-icon rs-icon-trash"></i>
                </button>
              </div>
              
            
            </Fragment>
            
          ))}
       

       <div className="row">
       <div className="col-lg-12 col-md-12 col-sm-12 col-12 justify-content-end text-right">
       <button
                  className="btn btn-link p-0 bxd"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                   <i class="fas fa-plus-circle"></i>
                </button>
       </div>
       <div className="form-group col-lg-3 col-md-6 col-sm-12 col-12">
        <button type="button" data-dismiss="modal"  className="btn-user btn-block btn btn-primary ">Submit</button>
        </div>
       </div>

                                

                                </div>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>
                   </Form>
);
     }}
   </Formik>

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

export default AddMedicine;