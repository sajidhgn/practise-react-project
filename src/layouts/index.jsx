import {Fragment, useState} from 'react';
import Header from './Header/index';
import Footer from './Footer/index';
import Sidebar from './Sidebar/index';


const Layout = ({ children }) => {
    const [toggle, setToggle] = useState(false);
   

const ToggleFunction=()=>{

    setToggle(!toggle);

}



    return(
    <Fragment>
        <div id="wrapper" >
       
        <Sidebar togglecls={toggle} />
        
        <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
        <Header clickfun={ToggleFunction} />
       <div className="container-fluid">
       {children}
       </div>
       </div>
        <Footer />
        </div>
        </div>
        </Fragment>
    )};

export default Layout;