import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import Layout from '../../layouts/index';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon } from 'rsuite';
import Spinner from 'react-bootstrap/Spinner';
import {useLocation,Link} from 'react-router-dom';



toast.configure({
autoClose: 8000,
draggable: false,
});


const UsersRoleslist= props =>{

    const {state} = useLocation();
const [roleslist,setRoleslist] = useState([]);
const [loading, setloading] = useState(false);
const [searcheck, setSearchcheck] = useState(false);



useEffect(() => {


fetchData();

}, [])


const fetchData = async () => {
    setloading(true);
    const res = await fetch(API_URL.url+'/user-roles', {
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",  
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({
        "user_id": state.userid,
        "resource": "user_roles",
        "method": "GET"
        })
    })
    .then(res => res.json())
    .then(
    (response) => {
       
        setRoleslist(response.data);
        setloading(false);

        console.log(response.data);
    },
    (error) => {
    }
    )
  
    
    }


function handleEmployeeDelete() {

    fetch(API_URL.url+"/employee", {
    method: "DELETE",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    
    },
    body: JSON.stringify({
    "user_id": state.empid,
    "resource": "employees",
    "method": "DELETE"
    })
    })
    .then(res => res.json())
    .then(
    (result) => {

        fetchData();
    
    toast.success(`${Notifications.deletedsuccess}`, {
    position: toast.POSITION.TOP_RIGHT });

    },
    (error) => {
    toast.error(`${Notifications.notdeletedsuccess}`, {
    position: toast.POSITION.TOP_RIGHT });
    })
    
    }


    function handleDelete(id) {

        fetch(API_URL.url+"/user-role", {
        method: "DELETE",
        headers: {
        "Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${Notifications.token}`
        
        },
        body: JSON.stringify({
        "id": `${id}`,
        "resource": "user_roles",
        "method": "DELETE"

        })
        })
        .then(res => res.json())
        .then(
        (result) => {
    
            fetchData();
        
        toast.success(`${Notifications.deletedsuccess}`, {
        position: toast.POSITION.TOP_RIGHT });
    
        },
        (error) => {
        toast.error(`${Notifications.notdeletedsuccess}`, {
        position: toast.POSITION.TOP_RIGHT });
        })
        
        }

  


return(

<Layout>
   
<Link to={process.env.PUBLIC_URL + "/users" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>

    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">User Roles List</h4>

  
            
        </div>
        <div className="card-body">


                        <Table   data={roleslist} height={350} loading={loading}>
                <Column minWidth={200} >
                    <HeaderCell>ID</HeaderCell>
                    <Cell>
        {(rowData, rowIndex) => {
          return <span>{rowIndex+1}</span>;
        }}
      </Cell>
                </Column>

             
                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Role</HeaderCell>
                    <Cell dataKey="role_id" />
                   
                </Column>
               
                <Column minWidth={170} fixed="right" >
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {
                          

                        return (    
                             
                        <>

                            {
                             
                               rowData.role_id==="employee"?
                               <span><a alt="emp" onClick={()=>handleEmployeeDelete()}>
                                <Icon icon="trash" /> </a></span>
                                : 
                                <span><a onClick={()=>handleDelete(rowData.id)}>
                                <Icon icon="trash" /> </a></span>
                               
                            }  

                        </>
                        );
                        }}
                    </Cell>
                </Column>

            </Table>
           

   
        </div>
    </div>
</Layout>

)

}

export default UsersRoleslist;