import  { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import {getpermit} from '../../utils/common';
import Layout from '../../layouts/index';
import {Link} from 'react-router-dom';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon } from 'rsuite';
import Spinner from 'react-bootstrap/Spinner';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createTheme();


toast.configure({
autoClose: 8000,
draggable: false,
});

const RolesList= props =>{
const [roles, setroles] = useState([]);
const [displayLength, setDisplayLength] = useState(10);
const [loading, setloading] = useState(false);
const [offset, setOffset] = useState(0);
const [alength, setalength] = useState();

const fetchData = async(offset) => {
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
        "offset" : offset
    })
    })
    .then(res => res.json())
    .then(
    (resp) => {
        setroles(resp.data);
        console.log(resp.data);
        console.log(resp);

       
        setalength(resp.total);


    setloading(false);
    },
    (error) => {
    }
    )
    
    }

useEffect(() => {

fetchData(offset);
}, [offset])



function handleDelete(id,name) {

fetch(API_URL.url+"/role", {
method: "DELETE",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": `${id}`,
"resource": "roles",
  "name": `${name}`,
  "method": "DELETE",
})
})
.then(res => res.json())
.then(
(result) => {

if(Object.prototype.hasOwnProperty.call(result, 'error')) {
    toast.error(`${result["error"]["message"]}`, {
    position: toast.POSITION.TOP_RIGHT });

} else {
    fetchData(offset);
 toast.success(`${Notifications.deletedsuccess}`, {
position: toast.POSITION.TOP_RIGHT });
}
})

}

const handleClick=(offset)=>{
    setOffset(offset)
    fetchData(offset);

}


 // ======== Permissions Data =========
 let addbtns;

 if(1<getpermit("roles")){

         addbtns =<Link to={process.env.PUBLIC_URL + "/add-role" } className="btn btn-primary btn-icon-split">
     <span className="icon text-white-50">
         <i className="fas fa-plus"></i>
     </span>
     <span className="text">Add</span>
     </Link>;       

 } else {
     addbtns = <span></span>;
 }

return( 

<Layout>
   
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Roles and Permissions List</h4>

           {addbtns}
        </div>
        <div className="card-body">
            <Table data={roles} loading={loading} height={500}>
                <Column minWidth={60} flexGrow={1}>
                    <HeaderCell>ID</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                        return <span>{rowIndex+1}</span>;
                        }}
                    </Cell>
                </Column>

                <Column minWidth={120} flexGrow={2} >
                    <HeaderCell>Role Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
              
                <Column width={90} fixed="right">
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (

                        <>

                        {(() => {
                            
                            if(2<getpermit("roles")){
                            return (  <Link to={{pathname: "/edit-role", state:{id: rowData.id,role:rowData.name} }}> <Icon icon="edit2" />
                            </Link>)
                                    }
                                 
                               
                    })()}

                    <span className="ml-3">
                    {3<getpermit("roles")? <a href alt={rowData.id} onClick={()=>handleDelete(rowData.id,rowData.name)}>
                                <Icon icon="trash" /> </a>:<span></span>}
                                </span>
                        </>
                        );
                        }}
                    </Cell>
                </Column>

            </Table>
            <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Pagination
          limit={10}
          offset={offset}
          total={alength}
          onClick={(e, offset) => handleClick(offset)}
        />
      </MuiThemeProvider>
       
        </div>
    </div>
    </Layout>

    )

    }

    export default RolesList;