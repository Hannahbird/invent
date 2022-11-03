import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LOCATIONS } from '../../utils/queries';

//Modal styling from react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const SpacesList = ({ id }) => {
  // const { loading, data } = useQuery(QUERY_LOCATIONS, {
  //   variables: { deptId: id },
  // });

  // const spaces = data?.spaces || {};

  // if (!data.spaces.length) {
  //   return <h3>You have no spaces created yet.</h3>;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  //add spaces modal
  function AddSpacesModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Spaces
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Create Spaces</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Space Name</Form.Label>
              <Form.Control type="string" placeholder="Space Name" />
              <Form.Text className="text-muted">
                What is the Space Name?
              </Form.Text>
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Space Capacity</Form.Label>
              <Form.Control type="string" placeholder="Space Capacity" />
              <Form.Text className="text-muted">
                What is the capacity of this space?
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function Create() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setModalShow(true)}>
          Create Spaces
        </Button>

        <AddSpacesModal show={modalShow} onHide={() => setModalShow(false)} />
      </>
    );
  }

  return (
    <div>
      <h3>Your Current Spaces</h3>
      <Create />
      {/* {spaces &&
        spaces.map((space) => {
          <div key={space.id} className="mb-3 col-6">
            {space.name}
          </div>;
        })} */}
    </div>
  );
};

export default SpacesList;
