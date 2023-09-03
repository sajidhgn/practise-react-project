import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API_URL from "../../utils/api";
import Notifications from "../../utils/notifications";
import Layout from "../../layouts/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "react-bootstrap/Spinner";
import { RadioLab, RadioButton } from "react-radio-lab";

const EditRole = (props) => {
  const [roles, setRoles] = useState([]);
  const [loading, setloading] = useState(false);
  const [name, setname] = useState("");
  const [id, setId] = useState();
  const [o, setO] = useState([]);

  const fetchData = async () => {
     await fetch(API_URL.url + "/role", {
      method: "POST",
      headers: {
        Origin: "*",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Notifications.token}`,
      },
      body: JSON.stringify({
        resource: "roles",
        method: "GET",
        id: `${props.location.state.id}`,
        role: `${props.location.state.name}`
       
      }),
    })
      .then((res) => res.json())
      .then(
        (resp) => {
          setRoles(resp);

          let name = resp
            .map((item) => item.name)
            .filter((value, index, self) => self.indexOf(value) === index);
          let id = resp
            .map((item) => item.id)
            .filter((value, index, self) => self.indexOf(value) === index);
          setname(name);
          setId(id);
          setloading(true);

          console.log(resp);
        },
        (error) => {}
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (e) => {
    // const { name, value } = e;

    // setStat([name], va   lue);

    let a = e.split(",");
    let obj = { permission: parseInt(a[0]), resource: a[1] };

    checkPush(obj);

    console.log(o);
  };

  const checkPush = (obj) => {
    const rec = o.filter((x) => {
      return x.resource === obj.resource;
    });

    if (rec.length < 1) {
      o.push(obj);
    } else if (rec[0].permission !== obj.permission) {
      console.log(o.map((x) => (x.resource === obj.resource ? obj : x)));
    }
  };

  return (
    <Layout>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">
            Edit Role and Permissions
          </h4>
        </div>
        <div className="card-body">
          <div className="permitsec">
            {loading ? (
              <>
                {" "}
                <Formik
                  initialValues={{
                    role: "",
                  }}
                  onSubmit={async (values, actions) => {
                    await fetch(API_URL.url + "/role", {
                      method: "PUT",
                      headers: {
                        Origin: "*",
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${Notifications.token}`,
                      },
                      body: JSON.stringify({
                        resource: "roles",
                        method: "UPDATE",
                        id: `${id}`,
                        name: `${name}`,
                        permissions: o.map(({ resource, permission }) => ({
                          resource_id: resource,
                          permission: permission,
                        })),
                      }),
                    })
                      .then((res) => res.json())
                      .then(
                        (result) => {
                          toast.success(`${Notifications.addedsuccess}`, {
                            position: toast.POSITION.TOP_RIGHT,
                          });

                          window.location.replace("/roles-list");
                        },
                        (error) => {
                          toast.error(`${error["error"]["message"]}`, {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                        }
                      );

                    actions.resetForm({
                      values: {
                        role: "",
                        picked: "",
                      },
                    });
                  }}
                >
                  {(props) => {
                    const {
                    
                      touched,
                      errors,
                    
                    } = props;
                    return (
                      <Form>
                        <div className="row justify-content-center">
                          <div className="form-group col-lg-5 col-md-6 col-sm-12 col-12">
                            <label>Enter Role here</label>
                            <Field type="text" 
                              name="role"
                              value={name}
                              onChange={(e) => setname(e.target.value)}
                              className={ "form-control-user form-control" + (errors.role && touched.role ? " is-invalid" : "") }
                            />
                            <ErrorMessage
                              name="role"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        {roles.map((permit, i) => (
                          <div className="permitbox">
                            <div
                              role="group"
                              aria-labelledby="my-radio-group"
                              key={i}
                            >
                              <div className="row">
                                <div className="form-group col-lg-4 col-md-4 col-sm-12 col-12 mb-0">
                                  <h5>{permit.resource}</h5>
                                </div>
                                <div className="form-group col-lg-8 col-md-8 col-sm-12 col-12 mb-0">
                                  <div className="permitdet">
                                    <RadioLab
                                      init={
                                        `${permit.permission}` +
                                        "," +
                                        `${permit.resource}`
                                      }
                                      onChange={onChange}
                                      key={`1000` + i}
                                    >
                                      <div className="chkbex" key={`500` + i}>
                                        <span>Read</span>
                                        <RadioButton
                                          value={
                                            `${1}` + "," + `${permit.resource}`
                                          }
                                          name={permit.resource}
                                        ></RadioButton>
                                      </div>
                                      <div className="chkbex" key={`501` + i}>
                                        <span>Create</span>
                                        <RadioButton
                                          value={
                                            `${2}` + "," + `${permit.resource}`
                                          }
                                          name={permit.resource}
                                        ></RadioButton>
                                      </div>
                                      <div className="chkbex" key={`502` + i}>
                                        <span>Update</span>
                                        <RadioButton
                                          value={
                                            `${3}` + "," + `${permit.resource}`
                                          }
                                          name={permit.resource}
                                        ></RadioButton>
                                      </div>
                                      <div className="chkbex" key={`503` + i}>
                                        <span>Delete</span>
                                        <RadioButton
                                          value={
                                            `${4}` + "," + `${permit.resource}`
                                          }
                                          name={permit.resource}
                                        ></RadioButton>
                                      </div>
                                      <div className="chkbex" key={`504` + i}>
                                        <span>None</span>
                                        <RadioButton
                                          value={
                                            `${-1}` + "," + `${permit.resource}`
                                          }
                                          name={permit.resource}
                                        ></RadioButton>
                                      </div>
                                    </RadioLab>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="row">
                          <div className=" mt-3 form-group col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                            <button className="btn btn-primary " type="submit">
                              Update
                            </button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>{" "}
              </>
            ) : (
              <div className="prloader">
                <Spinner animation="border" variant="primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditRole;
