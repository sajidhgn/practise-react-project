import React from "react";
import { Link,useLocation} from 'react-router-dom';
import {getpermit} from '../../utils/common';


const Adminmenu=()=>{

   
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return(

        <React.Fragment>

                {(() => {
                            
                            if(0<getpermit("roles")){ 
                                return (<li className={`nav-item ${splitLocation[1] === "roles-list" ? "active" : ""}`}>
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                <i className="fas fa-fw fa-cog"></i>
                                                <span>Roles & Permissions</span>
                                            </a>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                                <div className="bg-white py-2 collapse-inner rounded">
                                                   
                                                <Link className="collapse-item" to="/roles-list">
                                        
                                        <span>  Roles List</span></Link>
                                                  
                                                </div>
                                            </div>
                                        </li>)
                            }
                            else {
                                return (<li></li>)
                            }
                        
                               
                        })()}


                        {(() => {
                            
                            if(0<getpermit("users")){ 

                                return ( <li className={`nav-item ${splitLocation[1] === "users" ? "active" : ""}`}>
                                <Link className="nav-link" to="/users">
                                    <i className="fas fa-fw fa-users"></i>
                                    <span>  Users</span></Link>
                                    
                            </li>)
                             }
                            else {
                                return (<li></li>)
                            }
                        
                               
                        })()}


                        {(() => {
                            
                            if(0<getpermit("brands")){ 

                                return (  <li className={`nav-item ${splitLocation[1] === "brands" ? "active" : ""}`}>
                                <Link className="nav-link" to="/brands">
                                    <i className="fas fa-fw fa-layer-group"></i>
                                    <span> Brands</span></Link>
                            </li>)
                             }
                            else {
                                return (<li></li>)
                            }                        
                               
                        })()}

                          
{(() => {
                            
                            if(0<getpermit("doses")){ 

                                return (   <li className={`nav-item ${splitLocation[1] === "doses" ? "active" : ""}`}>
                                <Link className="nav-link" to="/doses">
                                    <i className="fas fa-fw fa-layer-group"></i>
                                    <span> Doses</span></Link>
                            </li>)
                             }
                            else {
                                return (<li></li>)
                            }                        
                               
                        })()}


{(() => {
                            
                            if(0<getpermit("units")){ 

                                return (  <li className={`nav-item ${splitLocation[1] === "units" ? "active" : ""}`}>
                                <Link className="nav-link" to="/units">
                                    <i className="fas fa-fw fa-layer-group"></i>
                                    <span> Units</span></Link>
                            </li>)
                             }
                            else {
                                return (<li></li>)
                            }                        
                               
                        })()}

                        {(() => {

                            
                            
                            if(0<getpermit("entity_types")){ 

                                return (   <li className={`nav-item ${splitLocation[1] === "entity_types" ? "active" : ""}`}>
                                <Link className="nav-link" to="/entity_types">
                                    <i className="fas fa-fw fa-layer-group"></i>
                                    <span> Medicine Types</span></Link>
                            </li>)
                             }
                            else {
                                return (<li></li>)
                            }                        
                               
                        })()}

                        {(() => {
                            
                            if(0<getpermit("salts")){ 

                                return (   <li className={`nav-item ${splitLocation[1] === "salts" ? "active" : ""}`}>
                                <Link className="nav-link" to="/salts">
                                    <i className="fas fa-fw fa-layer-group"></i>
                                    <span> Salts</span></Link>
                            </li>)
                             }
                            else {
                                return (<li></li>)
                            }                        
                               
                        })()}

                        
                        {(() => {
                            
                            if(0<getpermit("medicines")){ 

                                return ( <li className={`nav-item ${splitLocation[1] === "active-medicines" ? "active" : splitLocation[1] === "inactive-medicines" ? "active" : ""}`}>
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                <i className="fas fa-fw fa-layer-group"></i>
                                                <span>Medicines</span>
                                            </a>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionSidebar">
                                                <div className="bg-white py-2 collapse-inner rounded">
                                                   
                                                <Link className="collapse-item" to="/active-medicines">
                                        
                                        <span>  Active Medicines</span></Link>
                                        <Link className="collapse-item" to="/inactive-medicines">
                                        
                                        <span>  In-active Medicines</span></Link>
                                                  
                                                </div>
                                            </div>
                                        </li>)
                             }
                            else {
                                return (<li></li>)
                            }                        
                               
                        })()}



{(() => {
                            
                            if(0<getpermit("entity_stock_history")){ 

                                return (   <li className={`nav-item ${splitLocation[1] === "entity-stock-histories" ? "active" : ""}`}>
                                <Link className="nav-link" to="/entity-stock-histories">
                                    <i className="fas fa-fw fa-layer-group"></i>
                                    <span> Stocks</span></Link>
                            </li>)
                             }
                            else {
                                return (<li></li>)
                            }                        
                               
                        })()}



                       
                        
                        {(() => {
                            
                            if(0<getpermit("medicine_sales")){

                                return (    <li className={`nav-item ${splitLocation[1] === "sales-list" ? "active" : ""}`}>
                                <Link className="nav-link" to="/sales-list">
                                    <i className="fas fa-fw fa-layer-group"></i>
                                    <span> Sales</span></Link>
                            </li> )
                             }
                            else {
                                return (<li></li>)
                            }                        
                               
                        })()}


  
 
    </React.Fragment>

    )

}

export default Adminmenu;