import React, { useState, useEffect} from 'react';
import {Form,Button} from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import {getpermit} from '../../utils/common';
import $ from 'jquery';
import Layout from '../../layouts/index';
import {Link} from 'react-router-dom';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon, InputNumber } from 'rsuite';
import Spinner from 'react-bootstrap/Spinner';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createTheme();

toast.configure({
autoClose: 8000,
draggable: false,
});

const StockTypeList= props =>{

const [stocktype, setStocktype] = useState([])
const [loading, setloading] = useState(false);
const [prloading, setprloading] = useState(false);
const [id, setId] = useState('');
const [stock_type, setStock_type] = useState('');
const [offset, setOffset] = useState(0);
const [alength, setalength] = useState();




const fetchData = async (offset) => {
    setloading(true);
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
        "method": "GET",
        "offset": offset
        })
        
    })
    .then(res => res.json())
    .then(
    (response) => {
        setStocktype(response.data);
    
        setalength(response.total);
    setloading(false);

    console.log(response.data)
    },
    (error) => {
    }
    )
    
    }



    useEffect(() => {
        fetchData(offset);
    }, [offset]);

const handleUpdate = async (e) => {
    e.preventDefault();

await fetch(API_URL.url+"/brand", {
method: "PUT",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": `${id}`,
"name": stock_type,
"resource": "brands",
"method": "UPDATE"
})
})
.then(res => res.json())
.then(
(result) => {


    if(Object.prototype.hasOwnProperty.call(result, 'error')) {
        toast.error(`${result["error"]["message"]}`, {
        position: toast.POSITION.TOP_RIGHT });
 
 } else {
    $('#updatemodal').modal('hide');
     toast.success(`${Notifications.updatedsuccess}`, {
 position: toast.POSITION.TOP_RIGHT });
 fetchData();
 }

})

}


const getstockdata=(id)=>{
    setprloading(true);
    fetch(API_URL.url+"/brand", {
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    
    },
    body: JSON.stringify({
        "id": `${id}`,
        "resource": "brands",
        "method": "GET"
        })
    })
    .then(res => res.json())
    .then(
    (result) => {
        
        setId(result.id);
        setStock_type(result.name);
        setprloading(false);
    },
    (error) => {
    
    })
    
    }

function handleDelete(id) {
    
fetch(API_URL.url+"/brand", {
method: "DELETE",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": `${id}`,
"resource": "brands",
"method": "DELETE",
})
})
.then(res => res.json())
.then(
(result) => {

toast.success(`${Notifications.deletedsuccess}`, {
position: toast.POSITION.TOP_RIGHT });
fetchData(offset);
},
(error) => {
toast.error(`${Notifications.notdeletedsuccess}`, {
position: toast.POSITION.TOP_RIGHT });
})
setloading(true);
}


const handleClick=(offset)=>{
    setOffset(offset)
    fetchData(offset);

}

// console.log(offset)

      // ======== Permissions Data =========
      let addbtns;

      if(1<getpermit("stock_types")){

              addbtns =<Link to={process.env.PUBLIC_URL + "/add-brand" } className="btn btn-primary btn-icon-split">
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
            <h4 className="m-0 font-weight-bold text-primary">Brands</h4>
           
                {addbtns}
           
           
        </div>
        <div className="card-body">
       <Table   data={stocktype}  height={500} loading={loading}>
                <Column minWidth={70}>
                    <HeaderCell>ID</HeaderCell>

                   <Cell>
        {(rowData, rowIndex) => {
          return <span>{rowIndex+1}</span>;
        }}
      </Cell>
                </Column>

                <Column minWidth={200} flexGrow={2}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
            
              
                <Column minWidth={120} fixed="right" flexGrow={1}>
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (
                        
                            <>

                        {(() => {
                        
                            if(2<getpermit("brands")){
                            return ( <a href="#updatemodal" data-toggle="modal" onClick={()=> getstockdata(rowData.id)}> <Icon icon="edit2" />
                            </a>)
                                    }
                                 

                                
                    })()}

                    <span className="ml-3">
                    {3<getpermit("stock_types")? <a href alt={rowData.id} onClick={()=>handleDelete(rowData.id)}>
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

    <div className="modal fade" id="updatemodal">
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card shadow mb-0">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Edit Brand</h6>
                                
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
                            </div>
                            <div className="card-body ha">
                            <div className="p-5">

                            {
                                prloading? <> <div className="prloader"><Spinner animation="border" variant="primary" className="mt-3" /></div>
                                    </>:<Form className="user" onSubmit={handleUpdate} method="PUT">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Brand name</Form.Label>
                                            <Form.Control className="form-control-user" name='value' value={stock_type}
                                                onChange={e=>setStock_type(e.target.value)} type="text"  />

                                        </Form.Group>
               

                                        <Button variant="primary" type="submit"  className="btn-user btn-block">
                                            Update
                                        </Button>
                                    </Form>
                            }
                                

                                </div>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>
</Layout>

)

}

export default StockTypeList;