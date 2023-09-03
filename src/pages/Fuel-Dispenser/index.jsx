import React, { useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import {getpermit} from '../../utils/common';
import Layout from '../../layouts/index';
import {Link,useHistory} from 'react-router-dom';
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

const FuelDispensersList= props =>{

const [fuelDispensersList, setFuelDispensersList] = useState([])
const [loading, setloading] = useState(false)
const [offset,setOffset]= useState(1);
const [alength,setalength]= useState();
const history = useHistory();

useEffect(() => {

fetchData(offset);
}, [offset])


const fetchData = async(offset) => {
    setloading(true);
    const res = await fetch(API_URL.url+'/fuel-dispensers', {
    
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({
        "resource": "fuel_dispensers",
        "method": "GET"
    })
    })
    .then(res => res.json())
    .then(
    (resp) => {
    
    setFuelDispensersList(resp.data);
    
    setalength(resp.total);
    setloading(false);
    
    })

    }




function handleDelete(id) {

fetch(API_URL.url+"/fuel-dispenser", {
method: "DELETE",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": `${id}`,
"resource": "fuel_dispensers",
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
 history.push('/fuel_dispensers');
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

if(1<getpermit("fuel_dispensers")){

    addbtns =<Link to={process.env.PUBLIC_URL + "/add-dispenser" } className="btn btn-primary btn-icon-split">
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
            <h4 className="m-0 font-weight-bold text-primary">Fuel Dispensers List</h4>
          {addbtns}
        </div>
        <div className="card-body">

       <Table   data={fuelDispensersList}  height={350} loading={loading}>
                <Column width={70} flexGrow={1}>
                    <HeaderCell>ID</HeaderCell>
                    <Cell>
                    
                    {(rowData, rowIndex) => {
                    return <span>{rowIndex+1}</span>;
                    }}
                    </Cell>
                </Column>

                <Column minWidth={150} flexGrow={2}>
                    <HeaderCell>Machine</HeaderCell>
                    <Cell dataKey="machine" />
                </Column>
                <Column minWidth={200} flexGrow={2}>
                    <HeaderCell>Meter</HeaderCell>
                    <Cell dataKey="meter" />
                </Column>
                <Column minWidth={150} flexGrow={2}>
                    <HeaderCell>Stock Type</HeaderCell>
                    <Cell dataKey="stock_type" />
                </Column>
                <Column minWidth={120} fixed="right" flexGrow={2}>
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (
                        <>
                         
                                {(() => {
                            
                            if(2<getpermit("fuel_dispensers")){
                            return (   <Link to={{pathname: "/edit-dispenser", state: rowData.id }}> <Icon icon="edit2" />
                            </Link>)
                                    }
                                   
                               
                    })()}

                    <span className="ml-3">
                    {3<getpermit("fuel_dispensers")? <a href alt={rowData.id} onClick={()=>handleDelete(rowData.id)}>
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

    export default FuelDispensersList;