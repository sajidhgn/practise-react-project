import React from 'react';
import jquery from 'jquery'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/css/sb-admin-2.css';
import Adminroutes from './routes/Adminroutes';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavScrollTop from "./components/Navscrolltop/index";
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import ForgotPsd from './pages/Forgot-Password/index';
import ResetPsd from './pages/Reset-Password/index';
import Dashboard from './pages/Dashboard';

const App=()=>{
    window.$ = window.jQuery = jquery;

  return (   
   <React.Fragment>
    <ToastContainer />
   <Router>
   <NavScrollTop>

   <Adminroutes/>
    
        <Switch>

    
            <Route exact path={["/", "/login"]} component={Login} />
            <Route   exact 
                path={`${process.env.PUBLIC_URL + "/register"}`}
                component={Register}
            />
             <Route   exact 
                path={`${process.env.PUBLIC_URL + "/forgot-password"}`}
                component={ForgotPsd}
            />
             <Route   exact 
                path={`${process.env.PUBLIC_URL + "/reset:id"}`}
                component={ResetPsd}
            />
           
            <Route  exact 
                path={`${process.env.PUBLIC_URL + "/dashboard"}`}
                
                component={Dashboard}
            />

           

          
        </Switch>
    </NavScrollTop>
</Router>
</React.Fragment>
  );

}

export default App;
