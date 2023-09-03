import React,{useEffect,useState} from "react";
import {Dropdown} from 'react-bootstrap';
import {getToken} from "../../utils/common";

const Header =(props)=>{
const [employee_name,setEmployee_name] = useState('');

    useEffect(() => {

    setEmployee_name(getToken("uname"));
            
            
    },[]);

   const logout=()=>{
        localStorage.clear();
        window.location.href = '/';
    }




return(
<React.Fragment>


    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


        <button id="sidebarToggleTop" onClick={props.clickfun}  className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
        </button>


        <ul className="navbar-nav ml-auto">



            <Dropdown as="li" className="nav-item dropdown no-arrow">
                <Dropdown.Toggle as="a"  id="dropdown-basic" className="nav-link dropdown-toggle cp">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{employee_name}</span>
                    <img className="img-profile rounded-circle" src="img/undraw_profile.svg" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow" aria-labelledby="userDropdown">
                   
                    <Dropdown.Item  onClick={logout}>
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            

        </ul>

    </nav>

</React.Fragment>
)
}


export default Header;