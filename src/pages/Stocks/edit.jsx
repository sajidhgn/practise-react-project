import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify';
import {Row, Col, Form, Button} from 'react-bootstrap';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import {useLocation, useHistory, Link} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
    autoClose: 8000,
    draggable: false,
});

const EditStock = (props) => {

    const history = useHistory();
    const {state} = useLocation();
    const [loading, setloading] = useState(false);
    const [prloading, setprloading] = useState(false);
    const [editstatus, setEditstatus] = useState(true);
    const [delivered_by, setDelivered_by] = useState('');
    const [purchase_date, setPurchase_date] = useState('');
    const [purchase_stock_qty, setPurchase_stock_qty] = useState();

    const defaultid = "0";
    const [medicine_id, setMedicine_id] = useState('');
    const [stock_id, setStock_id] = useState('');
    const [med_name, setMed_name] = useState('');
    const [medicines_list, setMedicines_list] = useState([]);
    const [formula_id, setFormula_id] = useState('');
    const [net_worth, setNet_worth] = useState('');
    const [med_formula_list, setMed_formula_list] = useState([]);
    const [salts_list, setSalts_list] = useState([]);
    const [purchase_from, setPurchase_from] = useState('');

    useEffect(() => {

        fetchMedicineslist();
        fetchStocklist();

    }, [])

    // Fetch Stock Object

    const fetchStocklist = async () => {

        await fetch(API_URL.url + '/entity-stock-history', {
            method: "POST",
            headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`
            },
            body: JSON.stringify({
                "resource": "entity_stock_history",
                "method": "POST",
                "id": state.id
            })

        })
            .then(res => res.json())
            .then(
                (response) => {

                    console.log(response)

                    setMed_name(state.name);
                    setStock_id(response.id);
                    setDelivered_by(response.delivered_by);

                    setNet_worth(response.net_worth);
                    setPurchase_date(response.purchase_date);
                    setPurchase_from(response.purchased_from);
                    setPurchase_stock_qty(response.total_stock_purchased);
                    setMedicine_id(response.entity_pricing.medicine_formula.medicine_id);
                    setFormula_id(response.entity_pricing.medicine_formula_id);

                    setSalts_list(response.entity_pricing.medicine_formula.salts);
                },
                (error) => {
                }
            )

    }

    // Fetch Medicines List

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

    const fldChange = () => {
        setprloading(false)
    }

    // Update Function
    const handleUpdate = async (e) => {
        e.preventDefault();
        setprloading(true);
        await fetch(API_URL.url+`/entity-stock-history`, {
            method: "PUT",
            headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`

            },
            body: JSON.stringify({
                "id":stock_id,
                "total_stock_purchased": purchase_stock_qty,
                "purchase_date": purchase_date,
                "purchased_from": purchase_from,
                "delivered_by": delivered_by,
                "net_worth": net_worth,
                "medicine_formula_id": formula_id,
                "resource": "entity_stock_history",
                "method": "UPDATE"
            })
        })
            .then(res => res.json())
            .then(
                (result) => {


                    if(Object.prototype.hasOwnProperty.call(result, 'error')) {
                        toast.error(`${result["error"]["message"]}`, {
                            position: toast.POSITION.TOP_RIGHT });

                    } else {
                        setprloading(false);
                        history.push('/entity-stock-histories');
                        toast.success(`${Notifications.addedsuccess}`, {
                            position: toast.POSITION.TOP_RIGHT });
                    }
                }
            )

    }

    return (

        <Layout>

            <Row>
                <Col lg={7} md={7} sm={12}>
                    <Link to={process.env.PUBLIC_URL + "/entity-stock-histories"}
                          className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
                        <span className="text">Back</span>
                    </Link>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Edit Stock</h6>
                        </div>
                        <div className="card-body">
                            <Form className="user" onSubmit={handleUpdate}>
                                <div className="p-4">
                                    <div className="row">

                                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                    controlId="formBasicPurchase">
                                            <Form.Label>Medicine name</Form.Label>
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

                                        </Form.Group>
                                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                    controlId="formBasicPurchase">
                                            <Form.Label>Medicine Formula</Form.Label>

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



                                        </Form.Group>

                                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                    controlId="formBasicPurchase">
                                            <Form.Label>Purchased Stock (qty)</Form.Label>
                                            <Form.Control className="form-control-user" min="0"
                                                          name='purchase_stock_qty' value={purchase_stock_qty}
                                                          onChange={e =>
                                                              setPurchase_stock_qty(e.target.value)} type="number"
                                                          required/>

                                        </Form.Group>

                                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                    controlId="formBasicPurchase">
                                            <Form.Label>Net worth (Rs)</Form.Label>
                                            <Form.Control className="form-control-user" min="0"
                                                          name='net_worth' value={net_worth}
                                                          onChange={e =>
                                                              setNet_worth(e.target.value)} type="number"
                                                          required/>

                                        </Form.Group>
                                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                    controlId="formBasicPurchase">
                                            <Form.Label>Purchase From</Form.Label>
                                            <Form.Control className="form-control-user"
                                                          name='purchase_from' value={purchase_from}
                                                          onChange={e =>
                                                              setPurchase_from(e.target.value)} type="text"
                                                          required/>

                                        </Form.Group>

                                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                    controlId="formBasicPurchase">
                                            <Form.Label>Delivered By</Form.Label>
                                            <Form.Control className="form-control-user"
                                                          name='delivered_by' value={delivered_by}
                                                          onChange={e =>
                                                              setDelivered_by(e.target.value)} type="text"
                                                          required/>

                                        </Form.Group>

                                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"
                                                    controlId="formBasicPDate">
                                            <Form.Label>Purchased Date</Form.Label>
                                            <Form.Control className="form-control-user" name='purchase_date'
                                                          value={purchase_date} onChange={e =>
                                                setPurchase_date(e.target.value)} type="date" required/>

                                        </Form.Group>
                                        <Form.Group className="mb-0 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <Button variant="primary" type="submit"
                                                    className="btn-user btn-block">
                                                Update
                                            </Button>
                                            {/*{*/}
                                            {/*    prloading ?*/}
                                            {/*        <Spinner animation="border" variant="primary" className="mt-3"/> :*/}
                                            {/*        <span></span>*/}
                                            {/*}*/}
                                        </Form.Group>
                                    </div>

                                </div>


                            </Form>


                        </div>
                    </div>

                </Col>
            </Row>


        </Layout>

    )
}

export default EditStock;