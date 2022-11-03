import React from 'react';
import { Link } from 'react-router-dom';

//Modal styling from react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SpacesList = () => {
  const spaces = [
    {
      name: 'Round Room',
      _id: 1,
    },
    {
      name: 'Round Room',
      _id: 2,
    },
  ];

  if (!spaces.length) {
    return <h3>You have no spaces created yet.</h3>;
  }

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
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
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
        <Button variant="primary" onClick={() => setModalShow(true)}>
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
      {spaces &&
        spaces.map((space) => {
          <div key={space.id} className="mb-3 col-6">
            {space.name}
          </div>;
        })}
    </div>
  );
};

export default SpacesList;
