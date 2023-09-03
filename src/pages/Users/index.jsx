import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import {getpermit,getrolebx,setCookie,getrolebox,deleteCookie,getCookie} from "../../utils/common.js";
import API_URL from '../../utils/api';
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


const Userslist= props =>{

const [userslist,setUserslist] = useState([]);
const [loading, setloading] = useState(false);
const [offset, setOffset] = useState(0);
const [alength, setalength] = useState();
const [search, setSearch] = useState('');
const [searcheck, setSearchcheck] = useState(false);
const [searchuserslist,setSearchuserslist] = useState([]);



useEffect(() => {


fetchData(offset);


(function() {
	var searchForm = document.getElementById('search-form'),
		textInput = searchForm.q,
		clearBtn = textInput.nextSibling;
	textInput.onkeyup = function() {
		
		clearBtn.style.visibility = (this.value.length) ? "visible" : "visible";
	};
	
	clearBtn.onclick = function() {
		this.style.visibility = "hidden";
		textInput.value = "";
	};
})();

if(getCookie("search")!==null){
    
    let cookieresult = getCookie("search");
    setSearch(cookieresult);

    setSearchcheck(true);

    const searchDataReload = async (offset) => {
        setloading(true);
        const res = await fetch(API_URL.url+'/users', {
        method: "POST",
        headers: {
        "Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",  
        "Authorization": `Bearer ${Notifications.token}`
        },
        body: JSON.stringify({
            "resource": "users",
            "method": "GET",
            "offset":offset,
            "search":cookieresult
            
            })
        })
        .then(res => res.json())
        .then(
        (response) => {
           
            setSearchuserslist(response.data);
            console.log(response.data);
            // setPermitList("search_result",[response.data]);
           
            setloading(false);
            setalength(response.total);
        },
        (error) => {
        }
        )
      
        }

        searchDataReload(offset);
    
} else{
    setSearchcheck(false);
    setSearch("");
}




}, [offset])


const fetchData = async (offset) => {
    setloading(true);
    const res = await fetch(API_URL.url+'/users', {
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",  
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({
        "resource": "users",
        "method": "GET",
        "offset":offset
        })
    })
    .then(res => res.json())
    .then(
    (response) => {
       
        setUserslist(response.data);
        setloading(false);
        setalength(response.total);
    },
    (error) => {
    }
    )
  
    
    }


function handleDelete(id) {

    fetch(API_URL.url+"/employee", {
    method: "DELETE",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    
    },
    body: JSON.stringify({
    "user_id": `${id}`,
    "resource": "employees",
    "method": "DELETE"
    })
    })
    .then(res => res.json())
    .then(
    (result) => {

        fetchData(offset);
    
    toast.success(`${Notifications.deletedsuccess}`, {
    position: toast.POSITION.TOP_RIGHT });

    },
    (error) => {
    toast.error(`${Notifications.notdeletedsuccess}`, {
    position: toast.POSITION.TOP_RIGHT });
    })
    
    }


    const handleClick=(offset)=>{
        setOffset(offset)
        fetchData(offset);
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  }


  const searchData = async (offset) => {
    setloading(true);
    const res = await fetch(API_URL.url+'/users', {
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",  
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({
        "resource": "users",
        "method": "GET",
        "offset":offset,
        "search":search
        
        })
    })
    .then(res => res.json())
    .then(
    (response) => {
       
        setSearchuserslist(response.data);
        console.log(response.data);
        // setPermitList("search_result",[response.data]);
       
        setloading(false);
        setalength(response.total);
    },
    (error) => {
    }
    )
  
    }

  const handleSearchClick = (e) => {
      e.preventDefault();

      searchData(offset);

      setCookie("search",search);

      setSearchcheck(true);
  }

  const clearSearchClick=()=>{
    deleteCookie("search");
    // deleteCookie("search_result");
    fetchData(offset);
    setSearchcheck(false);
    setSearch("");
  }

        // ======== Permissions Data =========
        let addbtns;

        if(1<getpermit("users")){

                addbtns =<Link to={process.env.PUBLIC_URL + "/add-user" } className="btn btn-primary btn-icon-split">
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
            <h4 className="m-0 font-weight-bold text-primary">Users List</h4>

            <div className="srchblk">
            <div className="searchlistbx">

            <form id="search-form" method="get" target="_blank">
    <span className="text-input-wrapper"><input type="text" name="q" autoComplete="off" className="form-control" value={search} onChange={handleChange} placeholder="Search..."/><span onClick={clearSearchClick} className="clearitem" title="Clear">&times;</span></span>
    <button type="submit" onClick={handleSearchClick} className="btn btn-primary"><i className="fas fa-search fa-sm"></i></button>
</form>
           
           
         </div>
         {addbtns}

        
         </div>
            
        </div>
        <div className="card-body">


        {(() => {
                           
                  if(searcheck){

                      return(<>
                        <Table   data={searchuserslist} height={500} loading={loading}>
                <Column minWidth={50} >
                    <HeaderCell>ID</HeaderCell>
                    <Cell>
        {(rowData, rowIndex) => {
          return <span>{rowIndex+1}</span>;
        }}
      </Cell>
                </Column>

                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column minWidth={200} flexGrow={1}>
               
                    <HeaderCell>Email/Phone</HeaderCell>
                    <Cell>
                    {rowData => { return (
                  <span>
                    {rowData.email || rowData.phone_number} 
                    
                    </span> 
                ) }}
                    </Cell>
                </Column>
                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Role</HeaderCell>
                    <Cell>
                        {rowData => {
                          

                        return (    
                             
                        <span>
                        
                        {(() => {
                            
                            if(0<getpermit("users")){
                            return ( rowData.roles.map((key,i)=>{
                                
                               return( <span key={i}>{i > 0 && ", "}{key.id}</span>)
                          }))
                                    }
                                   
                    })()}
                        </span>

                        );
                        }}
                    </Cell>
                   
                </Column>
                <Column minWidth={150} flexGrow={1}>
                    <HeaderCell>Gender</HeaderCell>
                    <Cell dataKey="gender" />
                </Column>
                <Column minWidth={120} fixed="right" >
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {
                          

                        return (    
                             
                        <>

                        {(() => {

                         
                          
                            
                               

                                    if(1<getpermit("users")){
                            return (<span> {getrolebx(rowData.roles) ==true? 
                            <Link to={{pathname: "/edit-employee", state:{empid:rowData.employee_id} }}>
                                                                    <i className="fas fa-pencil-alt"></i></Link> : <Link to={{pathname:"/add-employee",state:{userid: rowData.id} }} >
                                    <i className="fas fa-user-tie"></i></Link>}

                                                                    
                                        </span>)
                                    }
                                
                           

                                  

                    })()}


                    <span>
                    {3<getpermit("users")? <Link to={{pathname: "/edit-user-roles", state:{empid:rowData.employee_id,userid:rowData.id} }}>
                                <Icon icon="trash" /> </Link>:<span></span>}
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
</>
                      )
                  }       else {

                    return(<>
                        <Table   data={userslist} height={500} loading={loading}>
                <Column minWidth={50} >
                    <HeaderCell>ID</HeaderCell>
                    <Cell>
        {(rowData, rowIndex) => {
          return <span>{rowIndex+1}</span>;
        }}
      </Cell>
                </Column>

                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column minWidth={200} flexGrow={1}>
               
                    <HeaderCell>Email/Phone</HeaderCell>
                    <Cell>
                    {rowData => { return (
                  <span>
                    {rowData.email || rowData.phone_number} 
                    
                    </span> 
                ) }}
                    </Cell>
                </Column>
                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Role</HeaderCell>
                    <Cell>
                        {rowData => {
                          

                        return (    
                             
                        <span>
                        
                        {(() => {
                            
                            if(0<getpermit("users")){
                            return ( rowData.roles.map((key,i)=>{
                                
                               return( <span key={i}>{i > 0 && ", "}{key.id}</span>)
                          }))
                                    }
                                  
                    })()}
                        </span>

                        );
                        }}
                    </Cell>
                   
                </Column>
                <Column minWidth={150} flexGrow={1}>
                    <HeaderCell>Gender</HeaderCell>
                    <Cell dataKey="gender" />
                </Column>
                <Column minWidth={120} fixed="right" >
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {
                          

                        return (    
                             
                        <>

                        

                        {(() => {

                        
                    
                           
                            if(2<getpermit("users")){
                            return (<span> {getrolebx(rowData.roles)==='employee'? 
                            <Link to={{pathname: "/edit-employee", state:{empid:rowData.employee_id} }}>
                                                                    <i className="fas fa-pencil-alt"></i></Link> : 
                                <Link to={{pathname:"/add-employee",state:{userid: rowData.id} }} >
                                    <i className="fas fa-user-tie"></i></Link>}</span>)
                                    }
                              

                    })()}



                    <span>
                    {3<getpermit("users")? <a href alt={rowData.id} onClick={()=>handleDelete(rowData.id)}>
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
</>
                      )
                      
                  }        

        } )()}

       
                
   
        </div>
    </div>
</Layout>

)

}

export default Userslist;