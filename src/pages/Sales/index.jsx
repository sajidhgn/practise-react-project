import React, { useState, useEffect} from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import {getpermit} from '../../utils/common';
import Layout from '../../layouts/index';
import {Link} from 'react-router-dom';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon } from 'rsuite';
import Spinner from 'react-bootstrap/Spinner';


const theme = createTheme();

toast.configure({
autoClose: 8000,
draggable: false,
});

const Saleslist= props =>{
const [saleslist, setSaleslist] = useState([]);
const [loading, setloading] = useState(false);
const [offset, setOffset] = useState(0);
const [alength, setalength] = useState();

useEffect(() => {

    fetchData(offset);
    }, [offset])

const fetchData = async(offset) => {
    setloading(true);
    const res = await fetch(API_URL.url+'/medicine-sales', {
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({
        "resource": "sales",
        "method": "GET",
        "offset": offset
   })   
    })
    .then(res => res.json())
    .then(
    (resp) => {
    setSaleslist(resp.data);
    console.log(resp.data);
    setalength(resp.total);
    setloading(false);
    },
    (error) => {
    }
    )
    
    }


function handleDelete(id) {

fetch(API_URL.url+"/medicine-sale", {
method: "DELETE",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": `${id}`,
    "resource": "medicine_sales",
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

 if(1<getpermit("sales")){

         addbtns =<Link to={process.env.PUBLIC_URL + "/add-sale" } className="btn btn-primary btn-icon-split">
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
            <h4 className="m-0 font-weight-bold text-primary">Sales List</h4>
           {addbtns}
        </div>
        <div className="card-body">
        <Table   data={saleslist} loading={loading} height={350} >
                <Column minWidth={50} flexGrow={1}>
                    <HeaderCell>ID</HeaderCell>

                   <Cell>
        {(rowData, rowIndex) => {
          return <span>{rowIndex+1}</span>;
        }}
      </Cell>
                </Column>

                <Column minWidth={160} flexGrow={2}>
                    <HeaderCell>Medicine Name</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return <span style={{textTransform: "capitalize"}}>{rowData.medicine_formula.medicine.name}</span>;
                        }}
                    </Cell>
                </Column> 

                <Column minWidth={120} flexGrow={2}>
                    <HeaderCell>Sale Amount (Rs)</HeaderCell>
                   
                    <Cell>
                        {(rowData, rowIndex) => {
                        return <span>{<NumberFormat value={rowData.total_sale_amount} displayType={'text'} thousandSeparator={true}  />}</span>;
                        }}
                    </Cell>
                </Column>
                <Column minWidth={100} flexGrow={2}>
                    <HeaderCell>Brand</HeaderCell>

                    <Cell>
                        {(rowData, rowIndex) => {
                            return <span style={{textTransform: "capitalize"}}>{rowData.medicine_formula.medicine.brand_id}</span>;
                        }}
                    </Cell>
                </Column>

            <Column minWidth={100} flexGrow={2}>
                    <HeaderCell>Unit Type</HeaderCell>
                    <Cell style={{textTransform: "capitalize"}} dataKey="unit_id" />
                </Column>

              
                <Column width={100} fixed="right">
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (

                        <>

                        {(() => {
                            
                            if(2<getpermit("medicine_sales")){
                            return (  <Link to={{pathname: "/edit-sale", state: rowData.id }}> <Icon icon="edit2" />
                            </Link>)
                                    }
                                  
                               
                    })()}

                    <span className="ml-3">
                    {3<getpermit("medicine_sales")? <a href alt={rowData.id} onClick={()=>handleDelete(rowData.id)}>
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

export default Saleslist;