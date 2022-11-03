import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COMPANY_DEPTS } from '../../utils/queries';

//Modal styling from react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const DepartmentList = ({ id }) => {
  const { loading, data } = useQuery(QUERY_COMPANY_DEPTS, {
    variables: { deptId: id },
  });

  const departments = data?.departments || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.departments.length) {
    return <h3>No departments yet</h3>;
  }

  //Create department modal
  function AddDepartmentModal(props) {
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
              <Form.Control type="string" placeholder="Department Name" />
              <Form.Text className="text-muted">
                What is the Department's Name?
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function Create() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setModalShow(true)}>
          Create Department
        </Button>

        <AddDepartmentModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

  return (
    <div>
      <h3>Your Current Departments</h3>
      <Create />
      <div className="dropdown-menu">
        {departments.map((department) => {
          <button key={department._id} className="dropdown-item" type="button">
            <input type="checkbox" />
            {department.deptName}
          </button>;
        })}
      </div>
    </div>
  );
};

export default DepartmentList;
