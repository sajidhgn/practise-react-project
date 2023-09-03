import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import {rulespermit} from '../../utils/common';
import Layout from '../../layouts/index';
import Spinner from 'react-bootstrap/Spinner';

toast.configure({
autoClose: 8000,
draggable: false,
});

const PermsList= props =>{
const [rolelist, setrolelist] = useState([]);
const [resourcelist, setresourcelist] = useState([]);
const [loading, setloading] = useState(false);

const fetchData = async() => {
    setloading(true);
    const res = await fetch(API_URL.url+'/roles', {
    
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({

        "resource": "roles",
        "method": "GET",
        "with": "permissions"
    })
    })
    .then(res => res.json())
    .then(
    (resp) => {
        // setroles(resp.data);
        console.log(resp.data);
        let data = resp.data;
      let role = resp.data.map(item => item.role).filter((value, index, self) => self.indexOf(value) === index);
      let resources = resp.data.map(item => item.resource).filter((value, index, self) => self.indexOf(value) === index);


    //   data.map(item => item.role).filter(value);
      console.log(resources);
      console.log(role);



      setrolelist(role);
      setresourcelist(resources);
    setloading(false);
    },
    (error) => {
    }
    )
    
    }

useEffect(() => {

fetchData();
}, []);


 // ======== Permissions Data =========
//  let addbtns;

//  if(1<rulespermit()){

//          addbtns =<Link to={process.env.PUBLIC_URL + "/add-role" } className="btn btn-primary btn-icon-split">
//      <span className="icon text-white-50">
//          <i className="fas fa-plus"></i>
//      </span>
//      <span className="text">Add</span>
//      </Link>;       

//  } else {
//      addbtns = <span></span>;
//  }

return( 

<Layout>
   
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Roles and Permissions</h4>

           {/* {addbtns} */}
        </div>
        <div className="card-body">
           <div className="permslist">
               <div className="table-responsive">
               <table className="table table-bordered table-sm">
                <thead>
                <tr>
                <th><strong></strong></th>
                {
                    rolelist.map((role,i)=>(

                        <th key={i}><strong>{role}</strong></th>
                    ))
                }
                   

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>Doe</td>
                </tr>
                
                </tbody>
            </table>
               </div>
           </div>
        </div>
    </div>
    </Layout>

    )

    }

    export default PermsList;