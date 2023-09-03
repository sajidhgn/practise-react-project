import React, {useState, useEffect, Fragment} from "react";
import {toast} from "react-toastify";
import Notifications from "../../utils/notifications";
import {Row, Col} from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import API_URL from "../../utils/api";
import {getpermit} from "../../utils/common";
import Layout from "../../layouts/index";
import {Link} from "react-router-dom";
import {Table, Column, HeaderCell, Cell} from "rsuite-table";
import "rsuite/dist/styles/rsuite-default.css";
import {Icon} from "rsuite";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import Spinner from "react-bootstrap/Spinner";
import $ from "jquery";

const theme = createTheme();

toast.configure({
    autoClose: 8000,
    draggable: false,
});

const MedicinesList = (props) => {
    const [medicine_list, setMedicine_list] = useState([]);
    const [salted_list, setSalted_list] = useState([]);
    const [loading, setloading] = useState(false);
    const [sloading, setsloading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [alength, setalength] = useState();
    const entity_typeid = 0;
    const [inputFields, setInputFields] = useState([]);
    const [inputField, setInputField] = useState([{salt_id: '', dose_id: '', quantity: ''}]);
    const [salt_id_list, setSalt_id_list] = useState([]);
    const [unit_id, setUnit_id] = useState("");
    const [units_id, setUnits_id] = useState("");
    const [unit_id_list, setUnit_id_list] = useState([]);

    const [dose_id_list, setDose_id_list] = useState([]);
    const [brdname, setBrdname] = useState("");
    const [mdname, setMdname] = useState("");
    const [brand_ids, setBrand_ids] = useState("");
    const [medicine_names, setMedicine_names] = useState("");
    const [entity_type_ids, setEntity_type_ids] = useState("");
    const [entity_type_ide, setEntity_type_ide] = useState("");
    const [strips_per_packe, setStrips_per_packe] = useState("");
    const [price_per_packe, setPrice_per_packe] = useState("");

    const [units_per_stripe, setUnits_per_stripe] = useState("");

//   Edit Salts Area Fields

    const [price_per_pack, setPrice_per_pack] = useState("");
    const [units_per_strip, setUnits_per_strip] = useState("");
    const [price_per_strip, setPrice_per_strip] = useState("");
    const [price_per_unit, setPrice_per_unit] = useState("");
    const [strips_per_packs, setStrips_per_packs] = useState("");
    const [medicine_ids, setMedicine_ids] = useState("");
    const [medicine_ide, setMedicine_ide] = useState("");
    const [med_formula_id, setMed_formula_id] = useState("");


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


                    let list = resp.data.filter((key) => {

                        if (key.status_id === "active") {
                            return key;
                        }
                    })
                    setMedicine_list(list)


                    setalength(resp.total);
                    setloading(false);

                    console.log(resp.data);
                },
                (error) => {
                }
            );
    };


    useEffect(() => {
        fetchData(offset);
        fetchSaltsList();
        fetchDoseList();

        $(document).on("show.bs.modal", function (event) {
            if (!event.relatedTarget) {
                $(".modal").not(event.target).modal("hide");
            }
            if ($(event.relatedTarget).parents(".modal").length > 0) {
                $(event.relatedTarget).parents(".modal").modal("hide");
            }
        });

        $(document).on("shown.bs.modal", function (event) {
            if ($("body").hasClass("modal-open") == false) {
                $("body").addClass("modal-open");
            }
        });


        fetchDataUnits();

    }, [offset]);


    const fetchDataUnits = async () => {

        await fetch(API_URL.url + '/units', {
            method: "POST",
            headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`
            },
            body: JSON.stringify({
                "resource": "units",
                "method": "GET"
            })

        })
            .then(res => res.json())
            .then(
                (response) => {
                    setUnit_id_list(response.data);

                },
                (error) => {
                }
            )

    }


    function handleDelete(id) {
        fetch(API_URL.url + "/medicine", {
            method: "DELETE",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                id: `${id}`,
                "resource": "medicines",
                "method": "DELETE"
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
                    toast.success(`${Notifications.deletedsuccess}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            });


    }

    function handleDeleteFormula(id) {
        fetch(API_URL.url + "/medicine", {
            method: "DELETE",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                "medicine_formula_id": `${id}`,
                "resource": "medicines",
                "method": "DELETE",

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
                    $("#listsaltmodal").modal('hide');
                    toast.success(`${Notifications.deletedsuccess}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            });
    }

    const handleClick = (offset) => {
        setOffset(offset);
        fetchData(offset);
    };

    // ======== Permissions Data =========

    let addbtns;

    if (1 < getpermit("medicines")) {
        addbtns = (
            <Link
                to={process.env.PUBLIC_URL + "/add-medicine"}
                className="btn btn-primary btn-icon-split"
            >
        <span className="icon text-white-50">
          <i className="fas fa-plus"></i>
        </span>
                <span className="text">Add</span>
            </Link>
        );
    } else {
        addbtns = <span></span>;
    }


    // Salts List

    const fetchSaltsList = async () => {
        await fetch(API_URL.url + "/salts", {
            method: "POST",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                resource: "salts",
                method: "GET",
            }),
        })
            .then((res) => res.json())
            .then(
                (response) => {
                    setSalt_id_list(response.data);
                },
                (error) => {
                }
            );
    };

    // Dose List

    const fetchDoseList = async () => {
        await fetch(API_URL.url + "/doses", {
            method: "POST",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                resource: "doses",
                method: "GET",
            }),
        })
            .then((res) => res.json())
            .then(
                (response) => {
                    setDose_id_list(response.data);
                },
                (error) => {
                }
            );
    };


    // Clone Form Scripts

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({salt_id: "", dose_id: "", quantity: "", id: 0});
        setInputFields(values);
    };

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "salt_id") {
            values[index].salt_id = event.target.value;
        } else if (event.target.name === "dose_id") {
            values[index].dose_id = event.target.value;
        } else {
            values[index].quantity = event.target.value;
        }

        setInputFields(values);
    };

    // Salt Delete

    const handleRemoveFun = async (id) => {

        await fetch(API_URL.url + "/medicine-salt", {
            method: "DELETE",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                resource: "medicine_salts",
                method: "DELETE",
                id: `${id}`,
            }),
        })
            .then((res) => res.json())
            .then(
                (response) => {

                    fetchData(offset);
                    // fetchMedicinesList();


                },
                (error) => {

                }
            );
    };


    //   Update Medicine Formulas function

    const updateFormulasfun = async (e) => {
        e.preventDefault();
        setloading(true);
        await fetch(API_URL.url + `/medicine`, {
            method: "PUT",
            headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`

            },
            body: JSON.stringify({
                "medicine_formula_id": `${medicine_ids}`,
                "units_per_strip": units_per_strip,
                "unit_id": unit_id,
                "strips_per_pack": strips_per_packs,
                "salts": inputFields,
                "price_per_pack": price_per_pack,
                "resource": "medicines",
                "method": "UPDATE"
            })
        })
            .then(res => res.json())
            .then(
                (result) => {


                    if (Object.prototype.hasOwnProperty.call(result, 'error')) {
                        toast.error(`${result["error"]["message"]}`, {
                            position: toast.POSITION.TOP_RIGHT
                        });

                    } else {
                        setloading(false);
                        $("#editsaltsmodal").modal('hide');
                        $("#listsaltmodal").modal('show');
                        toast.success(`${Notifications.addedsuccess}`, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }
            )

    }


    //   Get Medicine list data in popup

    const fetchMedicinesList = (id) => {


        medicine_list.filter((key) => {
            if (key.id === id) {

                setMdname(key.name);
                setBrdname(key.brand_id);
                setMedicine_ide(key.id);
                setEntity_type_ide(key.entity_type_id);



                let med_formulas = key.medicine_formulas;



             let rst =   med_formulas.filter((key)=>{
                    if(key.status_id==="active"){

                        return key;
                    }
                })

                setSalted_list(rst);

                $("#listsaltmodal").modal("show");

            }
        });


    };

//   Get Dose and salts data in popup

    const handleEditSalts = (id, med_id) => {

        const values = [...inputFields];
        salted_list.filter((key) => {
            if (key.id === id) {

                key.salts.map((k, l) => {

                    values.push({salt_id: k.salt_id, dose_id: k.dose_id, quantity: k.quantity, id: k.id});

                })


                setInputFields(values);

                setPrice_per_pack(key.entity_pricing.price_per_pack);
                setPrice_per_strip(key.entity_pricing.price_per_strip);
                setPrice_per_unit(key.entity_pricing.price_per_unit);
                setUnits_per_strip(key.entity_pricing.units_per_strip);
                setStrips_per_packs(key.entity_pricing.strips_per_pack);
                setUnit_id(key.entity_pricing.unit_id);
                setMedicine_ids(key.id);
                setMed_formula_id(key.id);

            }
        });


        //   Get Medicine data in popup

        medicine_list.filter((kye) => {

            if (kye.id === med_id) {
                setMedicine_names(kye.name);
                setBrand_ids(kye.brand_id);
                setEntity_type_ids(kye.entity_type_id);

            }
        })
    };


    const fldChange = () => {
        setloading(false);
    };
    const onchangeunits = (e) => {
        setUnit_id(e.target.value);
    };


//   Close Modals

    const editsaltsmodal = (md_f_id, brand, name) => {

        $('#listsaltmodal').modal('show');
        $('#editsaltsmodal').modal('hide');

        setInputFields([]);
        setPrice_per_pack('');
        setPrice_per_strip('');
        setPrice_per_unit('');
        setUnits_per_strip('');
        setStrips_per_packs('');
        setUnit_id('');
        setMedicine_ids('');

    }

    const updatemodal = () => {

        $('#editsaltsmodal').modal('show');
        $('#updatemodal').modal('hide');
    }
    const addSaltsfun = () => {

        $('#addformulamodal').modal('show');
        $('#updatesmodal').modal('hide');
    }

    const Openformulamodal = () => {

        $('#listsaltmodal').modal('show');
        $('#addformulamodal').modal('hide');

    }

// Add Salts from Medicine Formulas

    const handleAddField = () => {
        const values = [...inputField];
        values.push({salt_id: '', dose_id: '', quantity: ''});
        setInputField(values);
    };

    const handleRemoveField = index => {
        const values = [...inputField];
        values.splice(index, 1);
        setInputField(values);
    };

    const handleInputChang = (index, event) => {
        const values = [...inputField];
        if (event.target.name === "salt_id") {
            values[index].salt_id = event.target.value;
        } else if (event.target.name === "dose_id") {
            values[index].dose_id = event.target.value;
        } else {
            values[index].quantity = event.target.value;
        }

        setInputField(values);
    };

    // Add Formula new popup function

    const addnewformulafun = async (e) => {
        e.preventDefault();

        setsloading(true);
        await fetch(API_URL.url + "/medicine", {
            method: "POST",
            headers: {
                Origin: "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Notifications.token}`,
            },
            body: JSON.stringify({
                "name": mdname,
                "units_per_strip": units_per_stripe,
                "strips_per_pack": strips_per_packe,
                "price_per_pack": price_per_packe,
                "unit_id": units_id,
                "entity_type_id": entity_type_ide,
                "brand_id": brdname,
                "salts": inputField,
                "resource": "medicines",
                "method": "POST",
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (
                    Object.prototype.hasOwnProperty.call(result, "error")
                ) {
                    toast.error(`${result["error"]["message"]}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    setsloading(false);
                    // history.push("/medicines");
                    fetchData(offset);

                    setTimeout(function () {
                        fetchMedicinesList(medicine_ide);
                    }, 2000);

                    toast.success(`${Notifications.addedsuccess}`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            });
    }


    return (
        <Layout>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold text-primary">Active Medicines</h4>

                    {addbtns}
                </div>
                <div className="card-body">
                    <Table data={medicine_list} loading={loading} height={500}>
                        <Column width={60}>
                            <HeaderCell></HeaderCell>
                            <Cell>
                                {(rowData, rowIndex) => {
                                    return (

                                        <button

                                            onClick={(e) =>
                                                fetchMedicinesList(
                                                    rowData.id
                                                )
                                            }
                                            className="p-0 text-primary bxd"
                                        >
                                            <i className="fas fa-plus-square"></i>
                                        </button>


                                    );
                                }}
                            </Cell>
                        </Column>
                        <Column minWidth={40} flexGrow={1}>
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
                        {/*    <HeaderCell>Formulas</HeaderCell>*/}
                        
                        {/*    <Cell>*/}
                        {/*        {(rowData) => {*/}
                        {/*            return <span>{rowData.medicine_formulas.length}</span>;*/}
                        {/*        }}*/}
                        {/*    </Cell>*/}
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

                        <Column minWidth={80} flexGrow={1}>
                            <HeaderCell>Status</HeaderCell>

                            <Cell>
                                {(rowData, rowIndex) => {

                                    return (
                                        <span className="badge badge-success">{rowData.status_id}</span>
                                    );
                                }}
                            </Cell>
                        </Column>

                        <Column width={90} fixed="right">
                            <HeaderCell>Action</HeaderCell>

                            <Cell>
                                {(rowData) => {
                                    return (
                                        <>
                                            {(() => {
                                                if (2 < getpermit("medicines")) {
                                                    return (
                                                        <Link
                                                            to={{
                                                                pathname: "/edit-medicine",
                                                                state: rowData.id,
                                                            }}
                                                        >
                                                            {" "}
                                                            <Icon icon="edit2"/>
                                                        </Link>
                                                    );
                                                }
                                            })()}

                                            <span className="ml-3">
                        {3 < getpermit("medicines") ? (
                            <a
                                href
                                alt={rowData.id}
                                onClick={() => handleDelete(rowData.id)}
                            >
                                <Icon icon="trash"/>{" "}
                            </a>
                        ) : (
                            <span></span>
                        )}
                      </span>
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

            <div className="modal fade" id="listsaltmodal">
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
                                    <div className="card-body">
                                        <div className="text-right px-2">
                                            <button
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#addformulamodal"
                                                className="btn-user btn-sm btn btn-secondary"

                                            >
                                                + Formula
                                            </button>
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
                                                                Salts
                                                            </th>
                                                            <th className="border-bottom-0 border-top-0  text-dark">
                                                                Action
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>

                                                        {salted_list.map((key, i) => {

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
                                                                        {
                                                                            <span
                                                                                style={{
                                                                                    textTransform: "capitalize",
                                                                                }}
                                                                            >
                                          {key.salts.length}
                                        </span>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                        {(() => {
                                                                            if (2 < getpermit("medicines")) {
                                                                                return (
                                                                                    <a
                                                                                        alt={key.id}
                                                                                        href="#editsaltsmodal"
                                                                                        data-toggle="modal"

                                                                                        onClick={() =>
                                                                                            handleEditSalts(key.id, key.medicine_id)
                                                                                        }
                                                                                    >
                                                                                        {" "}
                                                                                        <Icon icon="edit2"/>
                                                                                    </a>
                                                                                );
                                                                            }
                                                                        })()}
                                                                        <span className="ml-3">
                                        {3 < getpermit("medicines") ? (
                                            <a
                                                href
                                                className="text-danger cp"

                                                onClick={() => handleDeleteFormula(key.id)}
                                            >
                                                <Icon icon="trash"/>{" "}
                                            </a>
                                        ) : (
                                            <span></span>
                                        )}
                                      </span>
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

            <div
                className="modal fade"
                id="editsaltsmodal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">


                        <Row>
                            <Col lg={12} md={12} sm={12}>

                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            Edit Medicine Formula
                                        </h6>
                                        <button
                                            type="button"
                                            className={`close`}

                                            onClick={e => editsaltsmodal(med_formula_id, brand_ids, medicine_names)}

                                            aria-label="Close"
                                        >
                                                        <span aria-hidden="true">
                                                          &times;
                                                        </span>
                                        </button>
                                    </div>
                                    <div className="card-body ha">
                                        <div className="p-3">

                                            <form className="user" onSubmit={updateFormulasfun}>
                                                <div className="row">
                                                    <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="name">Name</label>

                                                        <span className="form-control-user"
                                                              style={{textTransform: "capitalize"}}> {medicine_names.replace(/_/g, " ")}</span>
                                                    </div>
                                                    <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="stocktype">
                                                            Medicine Type
                                                        </label>
                                                        <span className="form-control-user"
                                                              style={{textTransform: "capitalize"}}> {entity_type_ids.replace(/_/g, " ")}</span>

                                                    </div>
                                                    <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="stocktype">
                                                            Brands
                                                        </label>
                                                        <span className="form-control-user"
                                                              style={{textTransform: "capitalize"}}> {brand_ids.replace(/_/g, " ")}</span>

                                                    </div>

                                                    {(() => {
                                                        if (
                                                            entity_type_ids === "syrup" ||
                                                            entity_type_ids === "syrups"
                                                        ) {
                                                            return "";
                                                        } else {
                                                            return (
                                                                <>
                                                                    <div
                                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                        <label htmlFor="units_per_strip">
                                                                            Price per unit
                                                                        </label>
                                                                        <span
                                                                            className="form-control-user">{price_per_unit}</span>
                                                                    </div>
                                                                    <div
                                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                        <label htmlFor="units_per_strip">
                                                                            Price per strip
                                                                        </label>
                                                                        <span
                                                                            className="form-control-user">{price_per_strip}</span>
                                                                    </div>
                                                                    <div
                                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                        <label htmlFor="units_per_strip">
                                                                            Units per strip
                                                                        </label>
                                                                        <input
                                                                            name="units_per_strip"
                                                                            value={units_per_strip}
                                                                            onFocus={fldChange}
                                                                            onChange={e => setUnits_per_strip(e.target.value)}
                                                                            type="number"
                                                                            className={
                                                                                "form-control-user form-control"
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                        <label htmlFor="strips_per_packs">
                                                                            Strip per pack
                                                                        </label>
                                                                        <input value={strips_per_packs}
                                                                               name="strips_per_packs"
                                                                               onFocus={fldChange}
                                                                               onChange={e => setStrips_per_packs(e.target.value)}
                                                                               type="number"
                                                                               min="0"
                                                                               className={
                                                                                   "form-control-user form-control"
                                                                               }
                                                                        />
                                                                    </div>
                                                                </>
                                                            );
                                                        }
                                                    })()}

                                                    <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="price_per_pack">
                                                            Price per pack
                                                        </label>
                                                        <input
                                                            name="price_per_pack"
                                                            onFocus={fldChange}
                                                            value={price_per_pack}
                                                            onChange={e => setPrice_per_pack(e.target.value)}
                                                            type="number"
                                                            className={
                                                                "form-control-user form-control"
                                                            }
                                                        />

                                                    </div>
                                                    <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="stocktype">
                                                            Unit Type
                                                        </label>

                                                        <select
                                                            onChange={onchangeunits}
                                                            name="unit_id"
                                                            onFocus={fldChange}
                                                            value={unit_id}
                                                            className={
                                                                "form-control-user form-control"
                                                            }
                                                        >
                                                            <option
                                                                defaultValue={entity_typeid}
                                                            >
                                                                Select Unit Type
                                                            </option>
                                                            {unit_id_list.map((stock, i) => (
                                                                <option
                                                                    key={i}
                                                                    value={stock.id}
                                                                >
                                                                    {stock.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>


                                                    <div className="form-group col-lg-2 col-md-3 col-sm-6 col-6">

                                                        {(() => {
                                                            if (
                                                                entity_type_ids === "syrup" ||
                                                                entity_type_ids === "syrups"
                                                            ) {
                                                                return (<label className="text-white">B</label>);
                                                            } else {
                                                                return "";
                                                            }
                                                        })()}


                                                        <button
                                                            data-target="#updatemodal"
                                                            className="btn-user btn-block btn btn-secondary"
                                                            data-toggle="modal"
                                                            type="button"
                                                        >
                                                            + Salt
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div
                                                        className="form-group mt-2 mb-0 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <button
                                                            type="submit"
                                                            disabled={loading}
                                                            className="btn-user btn-block btn btn-primary mb-2"
                                                        >
                                                            Update
                                                        </button>
                                                        {loading ? (
                                                            <Spinner
                                                                animation="border"
                                                                variant="primary"
                                                                className="mt-3"
                                                            />
                                                        ) : (
                                                            <span></span>
                                                        )}
                                                    </div>
                                                </div>


                                            </form>


                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>


                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="updatemodal"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form className="user">
                            <div className="row ">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="card shadow mb-0">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">
                                                Edit Salts


                                            </h6>

                                            <button
                                                type="button"
                                                className="close"

                                                onClick={updatemodal}
                                                aria-label="Close"
                                            >
                                                        <span aria-hidden="true">
                                                          &times;
                                                        </span>
                                            </button>

                                        </div>

                                        <div className="card-body">
                                            <div className="p-4">
                                                {inputFields.map(
                                                    (
                                                        inputField,
                                                        index
                                                    ) => (
                                                        <Fragment
                                                            key={`${inputField}~${index}`}
                                                        >
                                                            <div className="form-row">
                                                                <div
                                                                    className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                    <label htmlFor="saltid">
                                                                        Salt name
                                                                    </label>

                                                                    <select
                                                                        name="salt_id"
                                                                        id="salt_id"
                                                                        value={
                                                                            inputField.salt_id
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleInputChange(
                                                                                index,
                                                                                event
                                                                            )
                                                                        }
                                                                        className={
                                                                            "form-control-user form-control"
                                                                        }
                                                                    >
                                                                        <option
                                                                            defaultValue={
                                                                                entity_typeid
                                                                            }
                                                                        >
                                                                            Select
                                                                            Salt
                                                                        </option>
                                                                        {salt_id_list.map(
                                                                            (
                                                                                stock,
                                                                                i
                                                                            ) => (
                                                                                <option
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    value={
                                                                                        stock.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        stock.name
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <div
                                                                    className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                    <label htmlFor="dose_id">
                                                                        Dose name
                                                                    </label>
                                                                    <select
                                                                        name="dose_id"
                                                                        id="dose_id"
                                                                        value={
                                                                            inputField.dose_id
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleInputChange(
                                                                                index,
                                                                                event
                                                                            )
                                                                        }
                                                                        className={
                                                                            "form-control-user form-control"
                                                                        }
                                                                    >
                                                                        <option
                                                                            defaultValue={
                                                                                entity_typeid
                                                                            }
                                                                        >
                                                                            Select
                                                                            Dose
                                                                        </option>
                                                                        {dose_id_list.map(
                                                                            (
                                                                                stock,
                                                                                i
                                                                            ) => (
                                                                                <option
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    value={
                                                                                        stock.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        stock.name
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                <div
                                                                    className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                    <label htmlFor="quantity">
                                                                        Quantity
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control-user form-control"
                                                                        id="quantity"
                                                                        name="quantity"
                                                                        value={
                                                                            inputField.quantity
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            handleInputChange(
                                                                                index,
                                                                                event
                                                                            )
                                                                        }
                                                                    />
                                                                </div>

                                                                {(() => {

                                                                    if (inputField.id == null || inputField.id == "") {

                                                                        return (<button
                                                                            className="btn btn-link text-danger p-0 bxd a"
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleRemoveFields(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="rs-icon rs-icon-trash"></i>
                                                                        </button>)
                                                                    } else {
                                                                        return (<button
                                                                            className="btn btn-link text-danger p-0 bxd b"
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleRemoveFun(
                                                                                    inputField.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="rs-icon rs-icon-trash"></i>
                                                                        </button>)
                                                                    }


                                                                })()}

                                                            </div>
                                                        </Fragment>
                                                    )
                                                )}

                                                <div className="row">
                                                    <div
                                                        className="col-lg-12 col-md-12 col-sm-12 col-12 justify-content-end text-right">
                                                        <button
                                                            className="btn btn-link p-0 bxd"
                                                            type="button"
                                                            onClick={() =>
                                                                handleAddFields()
                                                            }
                                                        >
                                                            <i className="fas fa-plus-circle"></i>
                                                        </button>
                                                    </div>
                                                    <div className="form-group col-lg-3 col-md-6 col-sm-12 col-12">
                                                        <button
                                                            type="button"
                                                            onClick={updatemodal}
                                                            className="btn-user btn-block btn btn-primary "
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {
                /* Add Medicine Formula Popup */
            }

            <div className="modal fade" id="addformulamodal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="row ">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Add Formula</h6>
                                        <button
                                            type="button"
                                            className="close"
                                            onClick={Openformulamodal}
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="card-body ha">
                                        <div className="p-4">


                                            <form className="user" onSubmit={addnewformulafun}>
                                                <div className="row">
                                                    <div
                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="name">Name</label>
                                                        <span className="form-control-user"
                                                              style={{textTransform: "capitalize"}}>{mdname.replace(/_/g, " ")}</span>
                                                    </div>
                                                    <div
                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="stocktype">Medicine Type</label>

                                                        <span className="form-control-user"
                                                              style={{textTransform: "capitalize"}}>{entity_type_ide}</span>
                                                    </div>
                                                    <div
                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="stocktype">Brand</label>
                                                        <span className="form-control-user"
                                                              style={{textTransform: "capitalize"}}>{brdname.replace(/_/g, " ")}</span>

                                                    </div>

                                                    {(() => {
                                                        if (
                                                            entity_type_ide === "syrup" ||
                                                            entity_type_ide === "syrups"
                                                        ) {
                                                            return "";
                                                        } else {
                                                            return (
                                                                <>
                                                                    <div
                                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                        <label htmlFor="units_per_strip">
                                                                            Units per strip
                                                                        </label>
                                                                        <input
                                                                            onFocus={fldChange}
                                                                            name="units_per_stripe"
                                                                            onChange={e=>setUnits_per_stripe(e.target.value)}
                                                                            type="text"
                                                                            className={
                                                                                "form-control-user form-control"
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                        <label htmlFor="strips_per_pack">
                                                                            Strip per pack
                                                                        </label>
                                                                        <input
                                                                            onFocus={fldChange}
                                                                            name="strips_per_pack"
                                                                            onChange={e=>setStrips_per_packe(e.target.value)}
                                                                            type="text"
                                                                            className={
                                                                                "form-control-user form-control"
                                                                            }
                                                                        />
                                                                    </div>
                                                                </>
                                                            );
                                                        }
                                                    })()}

                                                    <div
                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="price_per_pack">
                                                            Price per pack
                                                        </label>
                                                        <input
                                                            onFocus={fldChange}
                                                            name="price_per_packe"
                                                            onChange={e=>setPrice_per_packe(e.target.value)}
                                                            type="text"
                                                            className={
                                                                "form-control-user form-control"}
                                                        />

                                                    </div>
                                                    <div
                                                        className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="stocktype">Unit Type</label>

                                                        <select
                                                            onFocus={fldChange}
                                                            onChange={e => setUnits_id(e.target.value)}
                                                            name="units_id"
                                                            className={
                                                                "form-control-user form-control" }>
                                                            <option defaultValue={entity_typeid}>
                                                                Select Unit Type
                                                            </option>
                                                            {unit_id_list.map((stock, i) => (
                                                                <option key={i} value={stock.id}>
                                                                    {stock.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>


                                                    <div
                                                        className="form-group col-lg-2 col-md-3 col-sm-6 col-6">
                                                        <label className="text-white">Brands</label>

                                                        <a
                                                            href="#updatesmodal"
                                                            className="btn-user btn-block btn btn-secondary"
                                                            data-toggle="modal"
                                                            type="button"
                                                        >
                                                            + Salt
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div
                                                        className="form-group mt-3 mb-0 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <button
                                                            type="submit"
                                                            disabled={loading}
                                                            className="btn-user btn-block btn btn-primary mb-2"
                                                        >
                                                            Submit
                                                        </button>
                                                        {loading ? (
                                                            <Spinner
                                                                animation="border"
                                                                variant="primary"
                                                                className="mt-3"
                                                            />
                                                        ) : (
                                                            <span></span>
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                                   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                /* Salts Add Modal */
            }

            <div className="modal fade" id="updatesmodal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="row ">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="card shadow mb-0">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Add Salts</h6>

                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <div className="p-4">
                                            {inputField.map((inputField, index) => (
                                                <Fragment key={`${inputField}~${index}`}>
                                                    <form className="user">
                                                        <div className="form-row">
                                                            <div
                                                                className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                <label htmlFor="saltid">Salt name</label>

                                                                <select
                                                                    onFocus={fldChange}
                                                                    name="salt_id"
                                                                    id="salt_id"
                                                                    value={inputField.salt_id}
                                                                    onChange={(event) => handleInputChang(index, event)}
                                                                    className={"form-control-user form-control"}
                                                                >
                                                                    <option defaultValue={entity_typeid}>
                                                                        Select Salt
                                                                    </option>
                                                                    {salt_id_list.map((stock, i) => (
                                                                        <option key={i} value={stock.id}>
                                                                            {stock.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div
                                                                className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                <label htmlFor="dose_id">Dose name</label>
                                                                <select
                                                                    onFocus={fldChange}
                                                                    name="dose_id"
                                                                    id="dose_id"
                                                                    value={inputField.dose_id}
                                                                    onChange={(event) => handleInputChang(index, event)}
                                                                    className={"form-control-user form-control"}
                                                                >
                                                                    <option defaultValue={entity_typeid}>
                                                                        Select Dose
                                                                    </option>
                                                                    {dose_id_list.map((stock, i) => (
                                                                        <option key={i} value={stock.id}>
                                                                            {stock.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div
                                                                className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                                                                <label htmlFor="quantity">Quantity</label>
                                                                <input
                                                                    type="text"
                                                                    onFocus={fldChange}
                                                                    className="form-control-user form-control"
                                                                    id="quantity"
                                                                    name="quantity"
                                                                    value={inputField.quantity}
                                                                    onChange={(event) => handleInputChang(index, event)}
                                                                />
                                                            </div>
                                                            <button
                                                                className="btn btn-link text-danger p-0 bxd"
                                                                type="button"
                                                                onClick={() => handleRemoveField(index)}
                                                            >
                                                                <i className="rs-icon rs-icon-trash"></i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </Fragment>
                                            ))}

                                            <div className="row">
                                                <div
                                                    className="col-lg-12 col-md-12 col-sm-12 col-12 justify-content-end text-right">
                                                    <button
                                                        className="btn btn-link p-0 bxd"
                                                        type="button"
                                                        onClick={() => handleAddField()}
                                                    >
                                                        <i className="fas fa-plus-circle"></i>
                                                    </button>
                                                </div>
                                                <div className="form-group col-lg-3 col-md-6 col-sm-12 col-12">
                                                    <button
                                                        type="button"
                                                        className="btn-user btn btn-primary"
                                                        onClick={addSaltsfun}
                                                    >
                                                        Add
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

export default MedicinesList;
