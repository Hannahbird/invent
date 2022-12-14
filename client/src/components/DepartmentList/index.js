import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_COMPANY_DEPTS } from "../../utils/queries";
import {
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from "../../utils/mutations";
//Modal styling from react-bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import AdminHeader from "../AdminHeader";

const DepartmentList = ({ id }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInfo, setEditInfo] = useState({ id: "", name: "" });

  const { loading, error, data, refetch } = useQuery(QUERY_COMPANY_DEPTS, {
    variables: { deptId: id },
  });

  const departments = data?.departments || {};
  console.log(departments);
  if (loading) {
    return (
      <>
        <AdminHeader /> <div>Loading...</div>
      </>
    );
  }

  if (!data.departments.length) {
    return (
      <>
        <AdminHeader />
        <h3>No departments yet</h3>
        <Create />
      </>
    );
  }

  //Create department modal
  function AddDepartmentModal(props) {
    const [addDepartment] = useMutation(ADD_DEPARTMENT);

    const deptSubmit = async () => {
      const newDept = document.getElementById("deptInput").value.trim();
      props.onHide()
      await addDepartment({ variables: { deptName: newDept } });
      refetch();
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Form onSubmit={deptSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Create Department</h4>
            <Form.Group className="mb-3">
              <Form.Label>Department Name*</Form.Label>
              <Form.Control
                type="string"
                placeholder="Department Name"
                id="deptInput"
                required
              />
              <Form.Text className="text-muted">
                What is the Department's Name?
              </Form.Text>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            type = 'submit'
            >
            Save
          </Button>
        </Modal.Footer>
            </Form>
      </Modal>
    );
  }

  function Create() {
    const [modalShow, setModalShow] = React.useState(false);
    console.log("create?");

    return (
      <>
        <Button
          variant="secondary"
          onClick={() => {
            setModalShow(true);
          }}
        >
          Create Department
        </Button>

        <AddDepartmentModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  const editDept = (event) => {
    setEditInfo({ id: event.target.id, name: event.target.value });
    setShowEditModal(true);
    console.log(showEditModal);
  };
  function EditModal() {
    const [updateDept] = useMutation(UPDATE_DEPARTMENT);
    const [deleteDept] = useMutation(DELETE_DEPARTMENT);
    const handleChange = async (type) => {
      if (type === "edit") {
        const newName = document.getElementById("deptInput").value.trim();
        await updateDept({
          variables: { deptId: editInfo.id, deptName: newName },
        });
        refetch();
      }
      if (type === "delete") {
        await deleteDept({ variables: { deptId: editInfo.id } });
        refetch();
      }
    };
    return (
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Edit Department</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="string"
                placeholder="Department Name"
                id="deptInput"
                defaultValue={editInfo.name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleChange("delete");
              setShowEditModal(false);
            }}
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleChange("edit");
              setShowEditModal(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <div>
      <AdminHeader />
      <div className="container">
        <h3>Your Current Departments</h3>
        <Create />
        {showEditModal && <EditModal />}
        <div className="mt-3">
          {departments.map((department) => {
            if (department.deptName.toLowerCase() === "admin") {
              return;
            }
            return (
              <div
                key={department._id}
                className="d-flex justify-content-between border rounded mt-1 listitem"
                type="div"
              >
                <p className="col-4 flex m-auto">{department.deptName}</p>
                <p className="col-4 m-auto">
                  Join code: {department.signUpLink}
                </p>
                <button
                  onClick={editDept}
                  id={department._id}
                  value={department.deptName}
                  className="btn col-2"
                >
                  edit
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
