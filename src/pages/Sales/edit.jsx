import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify';
import {Row, Col} from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import {useHistory, useLocation,Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
    autoClose: 8000,
    draggable: false,
});


const EditSale = () => {

    const defaultid = "0";
    const [medicine_id, setMedicine_id] = useState('');
    const [med_name, setMed_name] = useState('');
    const [employee_id, setEmployee_id] = useState('');
    const [employee_name, setEmployee_name] = useState('');
    const [stocktype, setStocktype] = useState([]);
    const [unit_id, setUnit_id] = useState('');
    const [quantity, setQuantity] = useState('');
    const [formula_id, setFormula_id] = useState('');
    const [medicines_list, setMedicines_list] = useState([]);
    const [med_formula_list, setMed_formula_list] = useState([]);
    const [loading, setloading] = useState(false);
    const [prloading, setprloading] = useState(false);
    const [editstatus, setEditstatus] = useState(true);
    const [salts_list, setSalts_list] = useState([]);

    const history = useHistory();
    const {state} = useLocation();

    useEffect(() => {

        fetchMedicineslist();
        fetchDispenserDatauser();
        fetchUnitsData();

        fetchSalelist();

    }, []);

    // Fetch Sale single data

    const fetchSalelist = async () => {

        await fetch(API_URL.url + '/medicine-sale', {
            method: "POST",
            headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`
            },
            body: JSON.stringify({
                "resource": "medicine_sales",
                "method": "POST",
                "id": state
            })

        })
            .then(res => res.json())
            .then(
                (response) => {

                    console.log(response)

                    setMed_name(response.medicine_formula.medicine.name);
                    setUnit_id(response.unit_id);
                    setQuantity(response.quantity);
                    setMedicine_id(response.medicine_formula.medicine_id);
                    setSalts_list(response.medicine_formula.salts);

                },
                (error) => {
                }
            )

    }

    const fetchMedicineslist = async () => {

        await fetch(API_URL.url + '/medicines', {
            method: "POST",
            headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`
            },
            body: JSON.stringify({
                resource: "medicines",
                method: "GET",
            })

        })
            .then(res => res.json())
            .then(
                (response) => {


                    let list = response.data.filter((key) => {

                        if (key.status_id === "active") {
                            return key;
                        }
                    })
                    setMedicines_list(list);

                },
                (error) => {
                }
            )

    }


    const onchangefun = (e) => {

        setEditstatus(false);
        setMedicine_id(e.target.value);
        let id = e.target.value;

        var vl = e.nativeEvent.target.selectedIndex;
        setMed_name(e.nativeEvent.target[vl].text)

        medicines_list.filter((key) => {
            if (key.id == id) {
                setMed_formula_list(key.medicine_formulas)
            }
        })

    }

    const getformuladet = (e) => {


        setFormula_id(e.target[e.target.selectedIndex].getAttribute('data-order'))
    }

    const createOption = (formula, index) => {
        return <><option key={index} data-order={formula.entity_pricing.id} value={formula.id}>{formula.medicine.name} {formula.salts.map((salt, i) => { return `${i > 0 ? "/" : ""}${salt.quantity}${salt.dose_id}`})}</option></>
    }

    const createSelect=()=>{

        return <><select onChange={e => getformuladet(e)} name="medicine_formula"
                         className="bg-white form-control-user form-control">
            <option selected={true} defaultValue={defaultid}>Select Medicine Formula
            </option>
            {med_formula_list.map((formula, i) => {
                return createOption(formula, i);
            })}</select></>
    }

    const createOptions = () => {
        return <option selected={true}>{med_name} {salts_list.map((salt, i) => {
            return `${i > 0 ? "/" : ""}${salt.quantity}${salt.dose_id}`
        })}</option>
    }


    // Users Data fetch

    const fetchDispenserDatauser = async () => {
        const res = await fetch(API_URL.url + '/user', {

            method: "POST",
            headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`
            },
            body: JSON.stringify({
                "resource": "users",
                "method": "GET",
                "token": `${Notifications.token}`
            })
        })
            .then(res => res.json())
            .then(
                (resp) => {


                    setEmployee_name(resp.name);
                    setEmployee_id(resp.id);

                    console.log(resp)


                },
                (error) => {
                }
            )

    }

    // Units Data fetch

    const fetchUnitsData = async () => {

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
                    setStocktype(response.data);

                },
                (error) => {
                }
            )

    }

    const fldChange = () => {
        setprloading(false)
    }



    return (
        <Layout>

            <Row>

                <Col lg={7} md={7} sm={12}>
                    <Link to={process.env.PUBLIC_URL + "/sales-list"}
                          className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
                        <span className="text">Back</span>
                    </Link>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Edit Sale</h6>
                        </div>
                        <div className="card-body">

                            <Formik

                                initialValues={{

                                    quantity: '',
                                    unit_id: '',
                                    user_id: '',

                                }}
                                onSubmit={async fields => {
                                    setloading(true);
                                    await fetch(API_URL.url + '/medicine-sale', {
                                        method: "POST",
                                        headers: {
                                            "Origin": "*",
                                            "Content-Type": "application/json",
                                            "Accept": "application/json",
                                            "Authorization": `Bearer ${Notifications.token}`
                                        },
                                        body: JSON.stringify({
                                            "id":state,
                                            "user_id": employee_id,
                                            "unit_id": unit_id,
                                            "resource": "sales",
                                            "quantity": quantity,
                                            "method": "UPDATE",
                                            "medicine_formula_id": formula_id
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
                                                    history.push('/sales-list');
                                                    toast.success(`${Notifications.addedsuccess}`, {
                                                        position: toast.POSITION.TOP_RIGHT
                                                    });
                                                }


                                            }
                                        )

                                }}
                            >
                                {props => {
                                    const {

                                        touched,
                                        errors,

                                    } = props;
                                    return (

                                        <Form className="user">
                                            <div className="p-4">
                                                <div className="row">

                                                    <div className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                                controlId="formBasicPurchase">
                                                        <label>Medicine name</label>
                                                        <select name="medicine_name" value={medicine_id}  onFocus={fldChange}
                                                                onChange={e => onchangefun(e)}
                                                                className="form-control-user form-control">
                                                            <option defaultValue={defaultid}>Select Medicine name
                                                            </option>

                                                            {
                                                                medicines_list.map((key, i) => {

                                                                    return (<option value={key.id}>{key.name}</option>)
                                                                })
                                                            }
                                                        </select>

                                                    </div>
                                                    <div className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                                controlId="formBasicPurchase">
                                                        <label>Medicine Formula</label>

                                                        {(() => {

                                                            if(editstatus==true){

                                                                return ( <select onChange={e => getformuladet(e)} name="medicine_formula"
                                                                                 className="bg-white form-control-user form-control">
                                                                    {createOptions()}</select>)
                                                            }
                                                            else {

                                                                return createSelect()
                                                            }


                                                        })()}



                                                    </div>
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="select_Employee"> Employee</label>

                                                        <span className="form-control-user" name='employee_name'>
                                                       {employee_name}
                                                    </span>
                                                    </div>
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="unit_id">Unit
                                                        </label>
                                                        <select value={unit_id} name="unit_id" required={true} onFocus={fldChange}
                                                                onChange={e => setUnit_id(e.target.value)}
                                                                className="form-control-user form-control">
                                                            <option defaultValue={defaultid}>Select Unit type
                                                            </option>
                                                            {
                                                                stocktype.map((key, i) => {

                                                                    return (<option value={key.id}>{key.name}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="quantity">Quantity</label>
                                                        <input  value={quantity} name="quantity" type="number" onChange={e=>setQuantity(e.target.value)} onFocus={fldChange()} required={true}
                                                               className={'form-control-user form-control'}/>

                                                    </div>

                                                    <div
                                                        className="form-group mb-0 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <button type="submit" disabled={loading}
                                                                className="btn-user btn-block btn btn-primary mb-2">Submit
                                                        </button>
                                                        {
                                                            loading ? <Spinner animation="border" variant="primary"
                                                                               className="mt-3"/> : <span></span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>


                        </div>
                    </div>

                </Col>
            </Row>

        </Layout>

    )
}

export default EditSale;