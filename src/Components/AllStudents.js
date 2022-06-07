import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

function AllStudents() {
  let i = 1;
  let [students, setStudents] = useState([]);
  let url = "https://629f1b078b939d3dc28f4f81.mockapi.io/students/";
  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    try {
      let res = await axios.get(url);
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (i) => {
    try {
      let res = await axios.delete(url + i);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>All Students</h1>
      <Table striped borderd hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Batch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.mobile}</td>
                <td>{e.class}</td>
                <td>
                  {/* <Button variant="secondary" onClick={()=>handleEdit(i)}>
                    Edit
                  </Button> */}
                  <Link to={`/edit-student/${e.id}`}>
                    <Button variant="secondary">Edit</Button>
                  </Link>
                  <span>&nbsp;&nbsp;</span>
                  <Button variant="danger" onClick={() => handleDelete(e.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default AllStudents;
