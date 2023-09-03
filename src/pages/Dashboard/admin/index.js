import React, {useState,useEffect} from 'react';
import Notifications from '../../../utils/notifications';
import API_URL from '../../../utils/api';
import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Export,
    Legend
  } from 'devextreme-react/pie-chart';
  import NumberFormat from 'react-number-format';


const Admindashboard=()=>{


  const [stockstate, setStockstate] = useState([]);


  useEffect(() => {


    const fetchData = async() => {
    const res = await fetch(API_URL.url+'/stats', {
    
    method: "POST",
    headers: {
    "Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${Notifications.token}`
    },
    body: JSON.stringify({
      "resource": "stock_stats",
      "method": "GET"
  })
    })
    .then(res => res.json())
    .then(
    (resp) => {
      
      setStockstate(resp.data); 

    },
    (error) => {
    }
    )
    
    }
    
    fetchData();

    


    }, [])



    const pointClickHandler=(e)=>{
        toggleVisibility(e.target);
      }
    
      const legendClickHandler=(e)=>{
        const arg = e.target;
        const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
    
        toggleVisibility(item);
      }
    
      const toggleVisibility=(item)=>{
        item.isVisible() ? item.hide() : item.show();
      }

      function customizeText(arg){
          
        return "Rs. "+arg.valueText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
      }
    
      
return(


  
<React.Fragment>

  
<div className="d-sm-flex align-items-center justify-content-between mb-4 ">
                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                       
                    </div>
                    <div className="row">

                     

{
    stockstate.map((key,i)=>(

<>
        <div className="col-xl-4 col-md-6 mb-4 dashbrdbx" key={i}>
        <a href={'#sd'+key.id}  data-toggle="modal" data-dismiss="modal">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Stock (<b className="text-dark"> {key.stock_type} </b>)</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800"> <NumberFormat
                                                                                          value={key.total_price.toFixed(0)}
                                                                                          displayType="text"
                                                                                          thousandSeparator={true}
                                                                                          prefix="Rs. "
                                                                                          /></div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </a>

           
                        </div>

                        <div className="modal fade" id={'sd'+key.id}>
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card shadow mb-0">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">{key.stock_type}</h6>
                                
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="card-body">
                            <div className="px-2">

                            <PieChart
        id="pie"
        dataSource={[{
        country: 'Total',
        area: key.total_price.toFixed(2),
      }, {
        country: 'Sale',
        area: key.sold_price.toFixed(2),
      },
      {
        country: 'Remaining',
        area: key.remaining_price.toFixed(2),
      }]}
        palette="Bright"
       
        onPointClick={pointClickHandler}
        onLegendClick={legendClickHandler}
      >
        <Series
          argumentField="country"
          valueField="area"
        >
          <Label 
          visible={true} 
          customizeText={customizeText}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>
        <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
        rowCount={1}
      />
        <Size width={450} />
        <Export enabled={false} />
      </PieChart>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>             
</>
    ))
}
                        
                     

                     
              
                    </div>



</React.Fragment>
)
}

export default Admindashboard;