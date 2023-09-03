import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import Notifications from "../../utils/notifications";
import API_URL from "../../utils/api";
import {getpermit} from "../../utils/common";
import Layout from "../../layouts/index";
import {Table, Column, HeaderCell, Cell} from "rsuite-table";
import "rsuite/dist/styles/rsuite-default.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import {Icon} from 'rsuite';
import Spinner from "react-bootstrap/Spinner";
import $ from "jquery";

const theme = createTheme();

toast.configure({
    autoClose: 8000,
    draggable: false,
});

const MedicinesinactiveList = (props) => {
    const [medicine_list, setMedicine_list] = useState([]);
    const [medicine_f_list, setMedicine_f_list] = useState([]);
    const [loading, setloading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [alength, setalength] = useState();
    const [formulas_list, setFormulas_list] = useState([]);


    const fetchData = async (offset) => {
        setloading(true);
        await fetch(API_URL.url + "/medicines", {
            method: "POST",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                resource: "medicines",
                method: "GET",
            }),
        })
            .then((res) => res.json())
            .then(
                (resp) => {


                    console.log(resp.data)
                    // Inactive Medicines

                    let list = resp.data.filter((medicine) => {

                        if (medicine.status_id === "inactive") {

                            return medicine;

                        } else if (medicine.status_id === "active") {
                            medicine.medicine_formulas.filter((m) => {
                                if (m.status_id === "inactive" && medicine.medicine_formulas.length > 0) {
                                    return medicine;
                                } else {
                                    return {}
                                }
                            })
                        }
                    })

                    // console.log(medicine_f_list)


                    setMedicine_list(list)

                    setalength(resp.total);
                    setloading(false);


                },
                (error) => {
                }
            );
    };


    useEffect(() => {
        fetchData(offset);

    }, [offset]);


    // Medicine Change Status function

    function handleChangeStatus(id) {
        fetch(API_URL.url + "/admin-by", {
            method: "POST",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                "medicine_id": `${id}`,
                "resource": "admin_by",
                "method": "POST",
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (Object.prototype.hasOwnProperty.call(result, "error")) {
                    toast.error(`${result["error"]["message"]}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    fetchData(offset);
                    toast.success(`${Notifications.activesuccess}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            });


    }


    // Medicine Formula Status function

    function changeFormulastatus(id) {
        fetch(API_URL.url + "/admin-by", {
            method: "POST",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                "medicine_formula_id": `${id}`,
                "resource": "admin_by",
                "method": "POST",
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (Object.prototype.hasOwnProperty.call(result, "error")) {
                    toast.error(`${result["error"]["message"]}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    fetchData(offset);
                    toast.success(`${Notifications.activesuccess}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    $("#listmedformulasmodal").modal("show");

                }
            });


    }

    const handleClick = (offset) => {
        setOffset(offset);
        fetchData(offset);
    };

    // ======== Permissions Data =========


    const medicine_listfun = async (id) => {

        await fetch(API_URL.url + '/medicine', {
            method: "POST",
            headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`
            },
            body: JSON.stringify({
                "id": id,
                "resource": "medicines",
                "method": "GET"
            })
        })
            .then(res => res.json())
            .then(
                (response) => {

                    // console.log(response);

                    let medformulas = (response.medicine_formulas);

                    let list = medformulas.filter((key) => {

                        if (key.status_id === "inactive") {
                            return key;
                        }
                    })
                    setFormulas_list(list)


                },
                (error) => {

                }
            )

    }


    return (
        <Layout>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold text-primary">Inactive Medicines</h4>


                </div>
                <div className="card-body">


                    <Table data={medicine_list} loading={loading} height={500}>

                        <Column minWidth={60} flexGrow={1}>
                            <HeaderCell>ID</HeaderCell>
                            <Cell>
                                {(rowData, rowIndex) => {
                                    return <span> {rowIndex + 1}</span>;
                                }}
                            </Cell>
                        </Column>

                        <Column minWidth={120} flexGrow={2}>
                            <HeaderCell>Medicine name</HeaderCell>
                            <Cell dataKey="name"/>
                        </Column>

                        <Column minWidth={120} flexGrow={1}>
                            <HeaderCell>Entity Type</HeaderCell>

                            <Cell>
                                {(rowData, rowIndex) => {
                                    let enty = rowData.entity_type_id;
                                    return (
                                        <span style={{textTransform: "capitalize"}}>
                      {enty.replace(/_/g, " ")}
                    </span>
                                    );
                                }}
                            </Cell>
                        </Column>

                        {/*<Column minWidth={120} flexGrow={1}>*/}
                        {/*  <HeaderCell>Formulas</HeaderCell>*/}

                        {/*  <Cell>*/}
                        {/*    {(rowData) => {*/}
                        {/*      return <span>{rowData.medicine_formulas.length}</span>;*/}
                        {/*    }}*/}
                        {/*  </Cell>*/}
                        {/*</Column>*/}

                        <Column minWidth={120} flexGrow={1}>
                            <HeaderCell>Brand</HeaderCell>

                            <Cell>
                                {(rowData, rowIndex) => {
                                    let enty = rowData.brand_id;
                                    return (
                                        <span style={{textTransform: "capitalize"}}>
                      {enty.replace(/_/g, " ")}
                    </span>
                                    );
                                }}
                            </Cell>
                        </Column>

                        <Column minWidth={120} flexGrow={1}>
                            <HeaderCell>Status</HeaderCell>

                            <Cell>
                                {(rowData) => {
                                    return (

                                        // <span className="badge badge-danger">{rowData.status_id}</span>

                                        <>
                 
                  <span className="ml-3">
                    {rowData.status_id === "active" ? (
                        <span className="badge badge-success">{rowData.status_id}</span>
                    ) : (
                        <span className="badge badge-danger">{rowData.status_id}</span>
                    )}
                  </span>
                                        </>
                                    )
                                }}
                            </Cell>
                        </Column>

                        <Column width={90} fixed="right">
                            <HeaderCell>Action</HeaderCell>

                            <Cell>
                                {(rowData) => {
                                    return (

                                        //    <span className="ml-3">
                                        //   {3 < getpermit("medicines") ? (
                                        //     <a
                                        //       href
                                        //       alt={rowData.id}
                                        //       onClick={() => handleChangeStatus(rowData.id)}
                                        //     >
                                        //       <i className="fas fa-undo text-success" ></i>{" "}
                                        //     </a>
                                        //   ) : (
                                        //     <span>
                                        //
                                        //     </span>
                                        //   )}
                                        // </span>
                                        <>
                                            {
                                                rowData.status_id === "active" ? (<a
                                                    href="#listmedformulasmodal" data-toggle="modal"
                                                    alt={rowData.id} onClick={() => medicine_listfun(rowData.id)}
                                                    className="cp"

                                                >
                                                    <i className="fas fa-pencil-alt text-primary"></i>
                                                </a>) : (<span className="ml-3">
                   {3 < getpermit("medicines") ? (
                       <a
                           href
                           alt={rowData.id}
                           onClick={() => handleChangeStatus(rowData.id)}
                       >
                           <i className="fas fa-undo text-success"></i>
                       </a>
                   ) : (
                       <span>
                      
                     </span>
                   )}
                 </span>)
                                            }

                                        </>
                                    );
                                }}
                            </Cell>
                        </Column>
                    </Table>

                    <MuiThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Pagination
                            limit={10}
                            offset={offset}
                            total={alength}
                            onClick={(e, offset) => handleClick(offset)}
                        />
                    </MuiThemeProvider>

                </div>
            </div>


            {/*  Change Medicine Formula Status Popupup */}

            <div className="modal fade" id="listmedformulasmodal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="row ">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="card shadow mb-0">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            Medicine Formulas
                                        </h6>

                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="card-body ha">
                                        <div className="text-right px-2">

                                        </div>
                                        <div className="p-2">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th className="border-bottom-0 border-top-0  text-dark">
                                                                Medicine name
                                                            </th>
                                                            <th className="border-bottom-0 border-top-0  text-dark">
                                                                Brand name
                                                            </th>

                                                            <th className="border-bottom-0 border-top-0  text-dark">
                                                                Action
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>

                                                        {formulas_list.map((key, i) => {

                                                          return (
                                                              <tr key={i}>
                                                                <td>
                                                                  {
                                                                    <span
                                                                        style={{
                                                                          textTransform: "capitalize",
                                                                        }}
                                                                    >
                                                                      {key.medicine.name.replace(/_/g, " ")}
                                                                    </span>
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    <span
                                                                        style={{
                                                                          textTransform: "capitalize",
                                                                        }}
                                                                    >
                                                                      {key.medicine.brand_id.replace(/_/g, " ")}
                                                                    </span>
                                                                  }
                                                                </td>

                                                                <td>
                                                                  {" "}
                                                                  {(() => {
                                                                    if (2 < getpermit("medicines")) {
                                                                      return (
                                                                          <a className="cp"

                                                                              onClick={()=>changeFormulastatus(key.entity_pricing.medicine_formula_id)}
                                                                          >
                                                                            {" "}
                                                                              <i className="fas fa-undo text-success"></i>
                                                                          </a>
                                                                      );
                                                                    }
                                                                  })()}

                                                                </td>
                                                              </tr>
                                                          );
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div
                                                    className="form-group col-lg-12 col-md-12 col-sm-12 col-12 mb-0 mt-3">
                                                    <button
                                                        type="button"
                                                        data-dismiss="modal"
                                                        className="btn-user btn-sm btn btn-primary "
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>


    );
};

export default MedicinesinactiveList;
