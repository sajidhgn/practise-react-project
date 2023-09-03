import { Link, useLocation } from "react-router-dom";
import Adminmenu from "./Adminmenu";


const Sidebar =(props)=>{

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    // const getRoutesBy = (role) => {return role === "owner" ? <Adminmenu/> : role === "employee" ? <Empmenu/> : role === "customer" ? <Usermenu/> : <Usermenu/>;}

    return(

        <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${props.togglecls ? "toggled" : "no"}`}  id="accordionSidebar" >

            
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Medical App</div>
            </a>

           
            <hr className="sidebar-divider my-0"/>

           
            <li className={`nav-item ${splitLocation[1] === "dashboard" ? "active" : ""}`}  >
                <Link className="nav-link" to={process.env.PUBLIC_URL + "/dashboard" }>
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>


           
            <Adminmenu/>
           

        </ul>


    )

}

export default Sidebar;