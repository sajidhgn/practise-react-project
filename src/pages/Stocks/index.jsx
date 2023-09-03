import React, { useState, useEffect} from 'react';
import NumberFormat from 'react-number-format';
import {  toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import {getpermit} from '../../utils/common';
import Layout from '../../layouts/index';
import {Link} from 'react-router-dom';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon } from 'rsuite';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import Spinner from 'react-bootstrap/Spinner';


const theme = createTheme();

toast.configure({
autoClose: 8000,
draggable: false,
});

const Stock= props =>{
const [stocks, setStocks] = useState([])
const [loading, setloading] = useState(false)
const [offset, setOffset] = useState(0)
const [alength, setalength] = useState();

const fetchData = async(offset) => {
    setloading(true);
    const res = await fetch(API_URL.url+'/entity-stock-histories', {
    
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({

        "resource": "entity_stock_history",
        "method": "GET",
        "offset": offset
    })
    })
    .then(res => res.json())
    .then(
    (resp) => {
    setStocks(resp.data);
    setalength(resp.total);
    setloading(false);

    console.log(resp.data)
    },
    (error) => {
    }
    )
    
    }

useEffect(() => {

fetchData(offset);
}, [offset])


function handleDelete(id) {

fetch(API_URL.url+"/entity-stock-history", {
method: "DELETE",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": `${id}`,
    "resource": "entity_stock_history",
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

 if(1<getpermit("stocks")){

         addbtns =<Link to={process.env.PUBLIC_URL + "/add-stock" } className="btn btn-primary btn-icon-split">
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
            <h4 className="m-0 font-weight-bold text-primary">Stock</h4>

           {addbtns}
        </div>
        <div className="card-body">
            <Table data={stocks} loading={loading} height={350}>
                <Column minWidth={60} flexGrow={1}>
                    <HeaderCell>ID</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                        return <span>{rowIndex+1}</span>;
                        }}
                    </Cell>
                </Column>

                <Column minWidth={120} flexGrow={2} >
                    <HeaderCell>Medicine Name</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return <span>{rowData.entity_pricing.medicine_formula.medicine.name}</span>;
                        }}
                    </Cell>
                </Column>

                <Column minWidth={120} flexGrow={2} >
                    <HeaderCell>Total Purchase</HeaderCell>
                    <Cell dataKey="total_stock_purchased" />
                </Column>

                <Column minWidth={120} flexGrow={2} >
                    <HeaderCell>Total Investment (Rs)</HeaderCell>
                   
                    <Cell>
                        {(rowData, rowIndex) => {
                        return <span>{<NumberFormat value={rowData.net_worth} displayType={'text'} thousandSeparator={true} />}</span>;
                        }}
                    </Cell>
                </Column>

                <Column minWidth={120} flexGrow={2} >
                    <HeaderCell>Purchase Date</HeaderCell>
                    <Cell dataKey="purchase_date" />
                </Column>

                <Column minWidth={120} flexGrow={2} >
                    <HeaderCell>Purchase From</HeaderCell>
                    <Cell dataKey="purchased_from" />
                </Column>

                <Column minWidth={120} flexGrow={2} >
                    <HeaderCell>Delivered by</HeaderCell>
                    <Cell dataKey="delivered_by" />
                </Column>

                <Column width={90} fixed="right">
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (

                        <>

                        {(() => {
                        
                            if(2<getpermit("entity_stock_history")){
                            return (  <Link to={{pathname: "/edit-stock", state: {id:rowData.id, name:rowData.entity_pricing.medicine_formula.medicine.name} }}> <Icon icon="edit2" />
                            </Link>)
                                    }
                             
                               
                    })()}

                    <span className="ml-3">
                    {3<getpermit("entity_stock_history")? <a href alt={rowData.id} onClick={()=>handleDelete(rowData.id)}>
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

    export default Stock;