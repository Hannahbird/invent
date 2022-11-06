import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_COMPANY_DEPTS } from '../../utils/queries';
import {
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from '../../utils/mutations';
//Modal styling from react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import AdminHeader from '../AdminHeader';

const DepartmentList = ({ id }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInfo, setEditInfo] = useState({ id: '', name: '' });

  const { loading, error, data, refetch } = useQuery(QUERY_COMPANY_DEPTS, {
    variables: { deptId: id },
  });

  const departments = data?.departments || {};

  if (loading) {
    return <div>Loading...</div>;
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

    const deptSubmit = () => {
      const newDept = document.getElementById('deptInput').value.trim();
      addDepartment({ variables: { deptName: newDept } });
      refetch();
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Create Department</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="string"
                placeholder="Department Name"
                id="deptInput"
              />
              <Form.Text className="text-muted">
                What is the Department's Name?
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              deptSubmit();
              props.onHide();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function Create() {
    const [modalShow, setModalShow] = React.useState(false);
    console.log('create?');

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
      if (type === 'edit') {
        const newName = document.getElementById('deptInput').value.trim();
        await updateDept({
          variables: { deptId: editInfo.id, deptName: newName },
        });
        refetch();
      }
      if (type === 'delete') {
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
              handleChange('delete');
              setShowEditModal(false);
            }}
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleChange('edit');
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
      <h3>Your Current Departments</h3>
      <Create />
      {showEditModal && <EditModal />}
      <div>
        {departments.map((department) => {
          if (department.deptName === 'admin') {
            return;
          }
          return (
            <div
              key={department._id}
              className="d-flex justify-content-between"
              type="div"
            >
              <p className="col-6 flex">{department.deptName}</p>
              <button
                onClick={editDept}
                id={department._id}
                value={department.deptName}
                className="btn col-6"
              >
                edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentList;
