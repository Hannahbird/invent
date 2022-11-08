import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_LOCATIONS } from '../../utils/queries';
import imageToBase64 from 'image-to-base64/browser'

//Modal styling from react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_EVENTTASK,
  UPDATE_LOCATION,
} from '../../utils/mutations';

import AdminHeader from '../AdminHeader';

const SpacesList = ({ id }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInfo, setEditInfo] = useState({
    locationId: '',
    locationName: '',
    capacity: '',
    locationImage: {}
  });
  const [image, setImage] = useState({});
  const [imageLoading, setImageLoading] = useState(true)
  const { loading, data, refetch } = useQuery(QUERY_LOCATIONS);
  const [addLocation] = useMutation(ADD_LOCATION);
  const spaces = data?.locations || {};

  useEffect(() => {
    if (image.encodedImage) {
      setImageLoading(false);
    }
    else {
      setImageLoading(true);
    }
  }, [image, imageLoading])

  const handleChange = async (event) => {
    //event.preventDefault();
    const imageData = event.target.files[0]

    if (imageData.size > 1000000) {
      console.log("Image is larger than 1 mb")
      //throw error
    }
  }

  if (!spaces.length) {
    return (
      <>
        <AdminHeader />
        <h3>You have no spaces created yet.</h3>
        <Create />
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  //add spaces modal
  function AddSpacesModal(props) {
    const onFormSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
      let test
      console.log(formDataObj)

      if (formDataObj.image.name.length) {
        console.log("there is an image")
        
        try {

          let reader = new FileReader();
          reader.onloadend = function () {
            setImage({
              encodedImage: reader.result,
              imageName: formDataObj.image.name
            })

          }
          reader.readAsDataURL(formDataObj.image);

          while (imageLoading) {
            //waiting
          }
        }
        catch (e) {
          console.log(e);
        }
      }

      console.log(image);
      const parsedObj = {
        locationName: formDataObj.locationName,
        capacity: parseInt(formDataObj.capacity),
        ...image
      };

      props.onHide();
      await addLocation({ variables: parsedObj });
      refetch();
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
      >
        <Form onSubmit={onFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Spaces
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Create Spaces</h4>
            <Form.Group className="mb-3">
              <Form.Label>Space Name</Form.Label>
              <Form.Control
                name="locationName"
                type="string"
                placeholder="Space Name"
              />
              <Form.Text className="text-muted">
                What is the Space Name?
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Space Capacity</Form.Label>
              <Form.Control
                name="capacity"
                type="number"
                placeholder="Space Capacity"
              />
              <Form.Text className="text-muted">
                What is the capacity of this space?
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId='formFile'>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                name='image'
                type='file'
                onChange={handleChange}
                /*Come back add type and size validation */
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
  function EditModal() {
    const [updateLocation] = useMutation(UPDATE_LOCATION);
    const [deleteLocation] = useMutation(DELETE_LOCATION);
    const handleDeleteLocation = async () => {
      await deleteLocation({ variables: { locationId: editInfo.locationId } });
      refetch();
    };
    const onFormSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
      const parsedObj = {
        locationId: editInfo.locationId,
        locationName: formDataObj.locationName,
        capacity: parseInt(formDataObj.capacity),
      };

      setShowEditModal(false);
      await updateLocation({ variables: parsedObj });
      refetch();
    };
    return (
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
        }}
      >
        <Form onSubmit={onFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Location
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Edit Location</h4>
            <Form.Group className="mb-3">
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                type="string"
                defaultValue={editInfo.locationName}
                name="locationName"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Space Capacity</Form.Label>
              <Form.Control
                name="capacity"
                type="number"
                placeholder="Space Capacity"
                defaultValue={editInfo.capacity}
              />
              <Form.Text className="text-muted">
                What is the capacity of this space?
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteLocation();
                setShowEditModal(false);
              }}
            >
              Delete
            </Button>
            <Button variant="secondary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
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
    <>
      <AdminHeader />
      <div className='container'>
        <h3>Your Current Spaces</h3>
        <Create />
        {showEditModal && <EditModal />}
        <div className="d-flex flex-wrap justify-content-evenly mt-3">
        {spaces &&
          spaces.map((space) => {
            return (
              <div key={space._id} className="mb-3 mx-3 col-lg-3 col-md-5 col-sm-12 border rounded">
                {space.locationName}
                <button
                  id={space._id}
                  data-capacity={space.capacity}
                  value={space.locationName}
                  className="btn col-6"
                  onClick={() => {
                    setShowEditModal(true);
                    setEditInfo({
                      locationId: space._id,
                      locationName: space.locationName,
                      capacity: space.capacity,
                    });
                    console.log(editInfo);
                  }}
                >
                  edit
                </button>
              </div>
            );
          })}
          </div>
      </div>
    </>
  );
};

export default SpacesList;
