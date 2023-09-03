import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Container,Row,Col} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
autoClose: 8000,
draggable: false,
});


const AddDispenser =()=>{

const [machine,setMachine] = useState('');
const [meter,setMeter] = useState('');
const [stock_type_id,setStock_type_id] = useState(0);
const [stock_type,setStock_type] = useState('');
const [stocktypelist,setStocktypelist] = useState([]);
const [loading, setloading] = useState(false)

useEffect(() => {

const fetchStockTypeList = async () => {
const res = await fetch(API_URL.url+'/stock-types', {
method: "POST",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`
},
body: JSON.stringify({
       
    "resource": "stock_types",
    "method": "GET",
    "offset": 0
    
})
})
.then(res => res.json())
.then(
(response) => {
    setStocktypelist(response.data);
},
(error) => {

}
)

}

fetchStockTypeList();

},[]);


const onchangefun=(e)=>{

    setStock_type_id(e.target.value)
var id = e.nativeEvent.target.selectedIndex;
    setStock_type(e.nativeEvent.target[id].text)

}



return (
<Layout>
    <ToastContainer />
    <Row>


        <Col lg={6} md={6} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/fuel_dispensers" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Add Fuel Dispenser</h6>
            </div>
            <div className="card-body">

            <Formik
                initialValues={{
                    machine: '',
                    meter: '',
                    stock_type_id: '',
                   
                }}
                validationSchema={Yup.object().shape({
                    machine: Yup.string()
                        .required('Machine name is required'),  
                    meter: Yup.string()
                        .required('Meter reading is required'),
                    
                    
                })}
                onSubmit={async fields => { 
                    setloading(true);
                    await fetch(API_URL.url+'/fuel-dispenser', {
        method: "POST",
        headers: {
        "Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${Notifications.token}`

        },
        body: JSON.stringify({
       
            "resource": "fuel_dispensers",
            "method": "POST",
            "machine": fields.machine,
            "stock_type_id": stock_type_id,
            "meter": fields.meter
            
        })
        })
        .then(res => res.json())
        .then(
        (result) => {

            setloading(false);
            window.location.replace("/fuel_dispensers");
            toast.success(`${Notifications.addedsuccess}`, {
        position: toast.POSITION.TOP_RIGHT });

        
        

        }, (error) => {

            if(Object.prototype.hasOwnProperty.call(error, 'error')) {
            toast.error(`${error["error"]["message"]}`, {
            position: toast.POSITION.TOP_RIGHT });
                }
        })


                }}
                >
               {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
                <Form className="user">
                       
                        <div className="form-group">
                            <label htmlFor="machine">Machine Name</label>
                            <Field name="machine" type="text" className={'form-control-user form-control' + (errors.machine && touched.machine ? ' is-invalid' : '')} />
                            <ErrorMessage name="machine" component="div" className="invalid-feedback" />
                        </div>                      
                        
                        <div className="form-group">
                            <label htmlFor="meter">Meter Readings</label>
                            <Field name="meter" type="meter" className={'form-control-user form-control' + (errors.meter && touched.meter ? ' is-invalid' : '')} >

                            </Field>
                            <ErrorMessage name="meter" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock_type_id">Stock Type</label>
                            <Field as="select" name="stock_type_id"  onChange={onchangefun} value={stock_type_id} className={'form-control-user form-control'} required >
                            <option defaultValue={stock_type_id}>Select Stock Type</option>
                                {stocktypelist.map((stock,i)=>(<option key={i} value={stock.id}>
                                    {stock.type}</option>))}
                            </Field>
                           
                        </div>
                       
                        <div className="form-group mb-0">
                            <button type="submit" disabled={loading} className="btn-user btn-block btn btn-primary mb-2">Submit</button>
                            {
                                loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                        </div>
                    </Form>
 );
      }}
    </Formik>

              

            </div>
        </div>

        </Col>
    </Row>

</Layout>

)
}

export default AddDispenser;