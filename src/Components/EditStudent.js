import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
const url = "https://629f1b078b939d3dc28f4f81.mockapi.io/students/";

function EditStudent() {
  let params = useParams();
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [cls, setBatch] = useState("");

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let res = await axios.get(url + params.id);
    setName(res.data.name);
    setEmail(res.data.email);
    setMobile(res.data.mobile);
    setBatch(res.data.class);
  };

  //update students function
  let handleSubmit = async () => {
    try {
      let res = await axios.put(url + params.id, {
        name,
        email,
        mobile,
        class: cls,
      });

      if (res.status == 200) {
        navigate("/all-students");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Add Students</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            value={mobile}
            placeholder="Mobile"
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Batch</Form.Label>
          <Form.Control
            type="text"
            value={cls}
            placeholder="Batch"
            onChange={(e) => setBatch(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Form>
    </>
  );
}

export default EditStudent;
