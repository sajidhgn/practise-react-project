import { Route, Switch } from "react-router-dom";
import {getpermit} from '../utils/common';


// // Doses
import Doses from '../pages/Doses/index';
import AddDose from '../pages/Doses/add';

// // Brands
import StockType from '../pages/Stock-Type/index';
import AddStockType from '../pages/Stock-Type/add';


// // Medicine Type
import Entitylist from '../pages/Entity-Type/index';
import AddEntity from '../pages/Entity-Type/add';

// // Units
import Unitslist from '../pages/Units/index';
import AddUnit from '../pages/Units/add';

// // Medicines
import Medicineslist from '../pages/Medicines/index';
import Medicineslistinactive from '../pages/Medicines/inactiveindex';
import AddMedicine from '../pages/Medicines/add';
import EditMedicine from '../pages/Medicines/edit';

// // Salts
import Saltlist from '../pages/Salts/index';
import AddSalt from '../pages/Salts/add';
import EditSalt from '../pages/Salts/edit';

// // Employee
import UsersList from '../pages/Users/index';
import AddEmployee from '../pages/Users/add';
import EditEmployee from '../pages/Users/edit';

import UsersRoleslist from '../pages/Users/user_roles';

// // Stocks
import Stock from '../pages/Stocks/index';
import AddStock from '../pages/Stocks/add';
import EditStock from '../pages/Stocks/edit';


// // Admin Sales
import Salelist from '../pages/Sales/index';
import AddSale from '../pages/Sales/add';
import EditSale from '../pages/Sales/edit';

// Admin Sales
import Adduser from '../pages/Users/add-user';
import Addrole from "../pages/Roles/add_role";
import Editrole from "../pages/Roles/edit-role";
import roleList from "../pages/Roles";
// import PermissionsList from "../pages/Roles/permissions_list";



const Adminroutes=()=>{

    return(

        // <Router>
       
    
            <Switch>

                    {(() => { 
    
    
                        if(0<getpermit("brands")){ 

                                return ( <Route exact 
                                    path={`${process.env.PUBLIC_URL + "/brands"}`}
                                   
                                    component={StockType}
                                />)
                             }
                            else {
                                return ('')
                            }
                        
                               
                        })()}

{(() => { 
    
    
    if(1<getpermit("brands")){ 

            return (  <Route  exact 
                path={`${process.env.PUBLIC_URL + "/add-brand"}`}
               
                component={AddStockType}
            />)
         }
        else {
            return ('')
        }
    
           
    })()}


    {/* Units */}


    {(() => { 
    
    
    if(0<getpermit("units")){ 

            return ( <Route exact 
                path={`${process.env.PUBLIC_URL + "/units"}`}
               
                component={Unitslist}
            />)
         }
        else {
            return ('')
        }
    
           
    })()}

{(() => { 


if(1<getpermit("units")){ 

return (  <Route  exact 
path={`${process.env.PUBLIC_URL + "/add-unit"}`}

component={AddUnit}
/>)
}
else {
return ('')
}


})()}



    {/* Doses */}

    {(() => { 
    
    
    if(1<getpermit("doses")){ 

            return (    <Route exact 
                path={`${process.env.PUBLIC_URL + "/add-dose"}`}
               
                component={AddDose}
            />)
         }
        else {
            return ('')
        }


      })()} 

    {(() => { 
    
    
    if(0<getpermit("doses")){ 

            return (   <Route exact path={`${process.env.PUBLIC_URL + "/doses"}`}
                   
            component={Doses}
        />)
         }
        else {
            return ('')
        }
    
           
    })()} 


  {/* Entity Type */}

  {(() => { 
    
    
    if(1<getpermit("entity_types")){ 

            return (    <Route exact 
                path={`${process.env.PUBLIC_URL + "/add-entitytype"}`}
               
                component={AddEntity}
            />)
         }
        else {
            return ('')
        }


      })()} 

    {(() => { 
    
    
    if(0<getpermit("entity_types")){ 

            return (   <Route exact path={`${process.env.PUBLIC_URL + "/entity_types"}`}
                   
            component={Entitylist}
        />)
         }
        else {
            return ('')
        }
    
           
    })()} 


    {/* Medicines */}
    

             {(() => { 
    
    
    if(0<getpermit("medicines")){ 

            return (   <Route exact path={`${process.env.PUBLIC_URL + "/active-medicines"}`}
                   
            component={Medicineslist}
        />)
         }
        else {
            return ('')
        }
    
           
    })()}   

{(() => { 
    
    
    if(0<getpermit("medicines")){ 

            return (   <Route exact path={`${process.env.PUBLIC_URL + "/inactive-medicines"}`}
                   
            component={Medicineslistinactive}
        />)
         }
        else {
            return ('')
        }
    
           
    })()}   

{(() => { 
    
    
    if(1<getpermit("medicines")){ 

            return (    <Route exact 
                path={`${process.env.PUBLIC_URL + "/add-medicine"}`}
               
                component={AddMedicine}
            />)
         }
        else {
            return ('')
        }


      })()} 


    {(() => { 
    

    if(2<getpermit("medicines")){ 

            return ( <Route exact 
                path={`${process.env.PUBLIC_URL + "/edit-medicine"}`}
               
                component={EditMedicine}
            />)
         }
        else {
            return ('')
        }


      })()}  


      {/* Salts */}


      {(() => { 
    
    
    if(0<getpermit("salts")){ 

            return (   <Route exact path={`${process.env.PUBLIC_URL + "/salts"}`}
                   
            component={Saltlist}
        />)
         }
        else {
            return ('')
        }
    
           
    })()}   

{(() => { 
    
    
    if(1<getpermit("salts")){ 

            return (    <Route exact 
                path={`${process.env.PUBLIC_URL + "/add-salt"}`}
               
                component={AddSalt}
            />)
         }
        else {
            return ('')
        }


      })()} 


    {(() => { 
    

    if(2<getpermit("salts")){ 

            return ( <Route exact 
                path={`${process.env.PUBLIC_URL + "/edit-salt"}`}
               
                component={EditSalt}
            />)
         }
        else {
            return ('')
        }


      })()}  



{(() => { 
    

    if(1<getpermit("employees")){ 

            return ( <Route exact  
                path={`${process.env.PUBLIC_URL + "/add-employee"}`}
               
                component={AddEmployee}
            />)
         }
        else {
            return ('')
        }


      })()} 


{(() => { 
    

    if(2<getpermit("employees")){ 

            return ( 
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/edit-employee"}`}
                  
                   component={EditEmployee}
               />
    )
         }
        else {
            return ('')
        }


      })()} 


    {(() => { 
    

    if(0<getpermit("users")){ 

            return ( 
                <Route exact 
                path={`${process.env.PUBLIC_URL + "/users"}`}
               
                component={UsersList}
            />  
    )
         }
        else {
            return ('')
        }


      })()} 


{(() => { 
    

    if(1<getpermit("users")){ 

            return ( 
                <Route exact 
                path={`${process.env.PUBLIC_URL + "/add-user"}`}
               
                component={Adduser}
            /> 
    )
         }
        else {
            return ('')
        }


      })()} 




{(() => { 
    

    if(2<getpermit("user_roles")){ 

            return ( 
                    
               <Route exact 
               path={`${process.env.PUBLIC_URL + "/edit-user-roles"}`}
              
               component={UsersRoleslist}
           />
 
    )
         }
        else {
            return ('')
        }


      })()}     
              
 
              

              {(() => { 
    

    if(0<getpermit("medicine_sales")){

            return ( 
                    
             
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/sales-list"}`}
                  
                   component={Salelist}
               />
 
    )
         }
        else {
            return ('')
        }


      })()} 
    
                
    {(() => { 
    

    if(1<getpermit("medicine_sales")){

            return ( 
                    
             
                <Route exact 
                path={`${process.env.PUBLIC_URL + "/add-sale"}`}
               
                component={AddSale}
            />
 
    )
         }
        else {
            return ('')
        }


      })()} 
               
           
               {(() => { 
    

    if(2<getpermit("medicine_sales")){

            return ( 
                    
             
                <Route exact 
                path={`${process.env.PUBLIC_URL + "/edit-sale"}`}
               
                component={EditSale}
            />  
 
    )
         }
        else {
            return ('')
        }


      })()} 
    
             
               
             
    {(() => { 
    

    if(0<getpermit("roles")){ 

            return ( 
                    
             
                <Route exact 
                path={`${process.env.PUBLIC_URL + "/roles-list"}`}
               
                component={roleList}
            />  

 
    )
         }
        else {
            return ('')
        }


      })()} 
               
    

               {(() => { 
    

    if(1<getpermit("roles")){ 

            return ( 
                    
             
             
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/add-role"}`}
                  
                   component={Addrole}
               />  

 
    )
         }
        else {
            return ('')
        }


      })()} 
               
               {(() => { 
    

    if(2<getpermit("roles")){ 

            return ( 
                    
             
             
                <Route exact 
                path={`${process.env.PUBLIC_URL + "/edit-role"}`}
               
                component={Editrole}
            />  

 
    )
         }
        else {
            return ('')
        }


      })()} 
    
             


    {(() => { 
    
    
    if(0<getpermit("entity_stock_history")){ 

            return (   <Route exact path={`${process.env.PUBLIC_URL + "/entity-stock-histories"}`}
                   
            component={Stock}
        />)
         }
        else {
            return ('')
        }
    
           
    })()}   

{(() => { 
    
    
    if(1<getpermit("entity_stock_history")){ 

            return (    <Route exact 
                path={`${process.env.PUBLIC_URL + "/add-stock"}`}
               
                component={AddStock}
            />)
         }
        else {
            return ('')
        }


      })()} 


    {(() => { 
    

    if(2<getpermit("entity_stock_history")){ 

            return ( <Route exact 
                path={`${process.env.PUBLIC_URL + "/edit-stock"}`}
               
                component={EditStock}
            />)
         }
        else {
            return ('')
        }


      })()}  
            </Switch>
        
    )
}

export default Adminroutes;