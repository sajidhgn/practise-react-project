import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify';
import {Row, Col} from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import {useHistory, Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


toast.configure({
    autoClose: 8000,
    draggable: false,
});


const AddStock = () => {

    const defaultid = "0";
    const [medicine_id, setMedicine_id] = useState('');
    const [med_name, setMed_name] = useState('');
    const [entity_pricing_id, setEntity_pricing_id] = useState('');
    const [formula_id, setFormula_id] = useState('');
    const [medicines_list, setMedicines_list] = useState([]);
    const [med_formula_list, setMed_formula_list] = useState([]);
    const [loading, setloading] = useState(false)

    const history = useHistory();

    useEffect(() => {

        fetchMedicineslist();

    }, []);

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

        setEntity_pricing_id(e.target.value)
        setFormula_id(e.target[e.target.selectedIndex].getAttribute('data-order'))
    }

    const fldChange = () => {
        setloading(false);
    }

    const createOption = (formula, index) => {
        return <option key={index} data-order={formula.entity_pricing.id}
                       value={formula.id}>{formula.medicine.name} {formula.salts.map((salt, i) => {
            return `${i > 0 ? "/" : ""}${salt.quantity}${salt.dose_id}`
        })}</option>
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
                            <h6 className="m-0 font-weight-bold text-primary">Add Stock</h6>
                        </div>
                        <div className="card-body">


                            <Formik
                                initialValues={{
                                    total_stock_purchased: '',
                                    medicine_name: '',
                                    purchase_date: '',
                                    purchased_from: '',
                                    delivered_by: '',
                                    net_worth: ''

                                }}
                                validationSchema={Yup.object().shape({
                                    total_stock_purchased: Yup.string()
                                        .required('Purchased Qty is required'),
                                    purchase_date: Yup.string()
                                        .required('Purchase date is required'),
                                    purchased_from: Yup.string()
                                        .required('Purchase from is required'),
                                    delivered_by: Yup.string()
                                        .required('Delivered by is required'),
                                    net_worth: Yup.string()
                                        .required('Total Purchased Amount is required')

                                })}
                                onSubmit={async fields => {
                                    setloading(true);
                                    await fetch(API_URL.url + '/entity-stock-history', {
                                        method: "POST",
                                        headers: {
                                            "Origin": "*",
                                            "Content-Type": "application/json",
                                            "Accept": "application/json",
                                            "Authorization": `Bearer ${Notifications.token}`

                                        },
                                        body: JSON.stringify({
                                            "total_stock_purchased": fields.total_stock_purchased,
                                            "purchase_date": fields.purchase_date,
                                            "purchased_from": fields.purchased_from,
                                            "delivered_by": fields.delivered_by,
                                            "net_worth": fields.net_worth,
                                            "resource": "entity_stock_history",
                                            "medicine_formula_id": formula_id,
                                            "entity_pricing_id": entity_pricing_id,
                                            "method": "POST",
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
                                                    history.push('/entity-stock-histories');
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

                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="medicine_name">Medicine Name</label>
                                                        <select name="medicine_name" onFocus={fldChange}
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
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="medicine_name">Medicine Formula</label>
                                                        <select onChange={e => getformuladet(e)} name="medicine_name"
                                                                className="bg-white form-control-user form-control">
                                                            <option defaultValue={defaultid}>Select Medicine Formula
                                                            </option>
                                                            {
                                                                med_formula_list.map((formula, i) => {
                                                                    return createOption(formula, i);
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="total_stock_purchased">Purchased Stock
                                                            (qty)</label>
                                                        <Field name="total_stock_purchased" type="text"
                                                               className={'form-control-user form-control' + (errors.total_stock_purchased && touched.total_stock_purchased ? ' is-invalid' : '')}/>
                                                        <ErrorMessage name="total_stock_purchased" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="net_worth">Net worth (Rs)</label>
                                                        <Field name="net_worth" type="text"
                                                               className={'form-control-user form-control' + (errors.net_worth && touched.net_worth ? ' is-invalid' : '')}/>
                                                        <ErrorMessage name="net_worth" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>

                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="purchased_from">Purchase From</label>
                                                        <Field name="purchased_from" type="text"
                                                               className={'form-control-user form-control' + (errors.purchased_from && touched.purchased_from ? ' is-invalid' : '')}/>
                                                        <ErrorMessage name="purchased_from" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>

                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="delivered_by">Delivered By</label>
                                                        <Field name="delivered_by" type="text"
                                                               className={'form-control-user form-control' + (errors.delivered_by && touched.delivered_by ? ' is-invalid' : '')}/>
                                                        <ErrorMessage name="delivered_by" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <label htmlFor="purchase_date">Purchase Date</label>
                                                        <Field name="purchase_date" type="date"
                                                               className={'form-control-user form-control' + (errors.purchase_date && touched.purchase_date ? ' is-invalid' : '')}/>
                                                        <ErrorMessage name="purchase_date" component="div"
                                                                      className="invalid-feedback"/>
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

export default AddStock;