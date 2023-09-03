import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';


const Permission=()=>{

    const [roles, setRoles] = useState([]);
    const [loading, setloading] = useState(false);



    const fetchData = async() => {
        // setloading(true);
        const res = await fetch(API_URL.url+'/resources', {
        
        method: "POST",
        headers: {
        "Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${Notifications.token}`
        },
        body: JSON.stringify({
    
            "resource": "resources",
            "method": "GET"
        })
        })
        .then(res => res.json())
        .then(
        (resp) => {
            setRoles(resp.data);
           
            setloading(true);
        },
        (error) => {
        }
        )
        
        }
    
    useEffect(() => {
    
    fetchData();
    }, [])


  
    

    return(

<Layout>
<div className="card shadow mb-4">
        <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Create Role and Permissions</h4>
           
        </div>
        <div className="card-body">
          <div className="permitsec">
          

             <Formik
      initialValues={{
        role:'',
      }}

      validationSchema={Yup.object().shape({
                    role: Yup.string()
                        .required('Role name  is required'),
                })}
    
      onSubmit={async (values, actions) => {
        var list = [];
        await new Promise((r) => setTimeout(r, 500));

        for (const [key, value] of Object.entries(values)) {
            list.push({resource_id: key, permission: value})
        }

        await fetch(API_URL.url+'/role', {
        method: "POST",
        headers: {
        "Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${Notifications.token}`

        },
        body: JSON.stringify({
       
            "resource": "roles",
            "method": "POST",
            "role": values.role,
            "permissions":list
            
        })
        })
        .then(res => res.json())
        .then(
        (result) => {

          
            window.location.replace("/roles-list");
            toast.success(`${Notifications.addedsuccess}`, {
        position: toast.POSITION.TOP_RIGHT });

        
        

        }, (error) => {

            if(Object.prototype.hasOwnProperty.call(error, 'error')) {
            toast.error(`${error["error"]["message"]}`, {
            position: toast.POSITION.TOP_RIGHT });
                }
        })

        actions.resetForm({
             values: {
              
                role:'',
               picked: '',
               
             },
            
           });
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
        <Form>
            <div className="row justify-content-center">
            <div className="form-group col-lg-5 col-md-6 col-sm-12 col-12">
             <label>Enter Role here</label>
                 <Field type="text" className="form-control" name="role" className={'form-control-user form-control' + (errors.role && touched.role ? ' is-invalid' : '')} />
                 <ErrorMessage name="role" component="div" className="invalid-feedback" />
             </div>
                
            </div>
           <div className="text-right mb-3">

           </div>

           {loading ? <>  {roles.map((permit,i)=>(
            
            <div className="permitbox" key={i}>
            <div role="group" aria-labelledby="my-radio-group" >
            
             <div className="row" >
             
             <div className="form-group col-lg-4 col-md-4 col-sm-12 col-12 mb-0">
                     <h5>{permit.name}</h5>
                    
                 </div>
                 <div className="form-group col-lg-8 col-md-8 col-sm-12 col-12 mb-0">
                     <div className="permitdet">                     
                     <div className="chkbex">
                     <span>Read</span>
                     <Field type="radio" value="1"  id="defaultRadio" name={permit.id} required />
                        </div>
                     <div className="chkbex">
                     <span>Create</span>
                     <Field type="radio" value="2"  id="defaultRadio" name={permit.id}  required />
                     </div>
                
                        <div className="chkbex">
                        <span>Update</span>
                        <Field type="radio" value="3"  id="defaultRadio" name={permit.id}  required/>
                        </div>
                        <div className="chkbex">
                        <span>Delete</span>
                        <Field type="radio" value="4"  id="defaultRadio" name={permit.id}  required/>
                        </div>
                        <div className="chkbex">
                        <span>None</span>
                        <Field type="radio" value="-1"  id="defaultRadio" name={permit.id}  required />
                        </div>
                     </div>

                 
                 </div> 
             </div>
             </div>

             </div>
            
          ))} </> : <div className="prloader"><Spinner animation="border" variant="primary" /></div> }

           
         
          <div className="row">
            <div className=" mt-3 form-group col-lg-12 col-md-12 col-sm-12 col-12 text-center">
            <button className="btn btn-primary"  type="submit">Submit</button>
           
             </div>
            </div>
          </Form>
          );
      }}
    </Formik>
  
           
                
                 
             
          </div>
        </div>
    </div>
</Layout>

    )
}

export default Permission;