import React,{useEffect,useState} from "react";
import Layout from '../../layouts/index';
import Admindashboard from './admin/index';
import {getpermit,getToken} from '../../utils/common';


const Dashboard=()=>{

  const [employee_name,setEmployee_name] = useState('');

  useEffect(() => {

    
    setEmployee_name(getToken("uname"));
         
 },[]);

return(

<Layout>
{(() => {
                            

 if(3<getpermit("roles")){

  return (
    <Admindashboard/>
  )
} else {

  return(

    <div><h1 className="h3">Welcome {employee_name}</h1></div>
  )
}

})()}


                          

</Layout>

)
}

export default Dashboard;