import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_LOCATIONS } from '../../utils/queries';

//Modal styling from react-bootstrap
import {Card, Button, Modal, Form} from 'react-bootstrap'
import {
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
} from "../../utils/mutations";

import AdminHeader from "../AdminHeader";

const SpacesList = ({ id }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInfo, setEditInfo] = useState({
    locationId: '',
    locationName: '',
    capacity: '',
  });
  const [image, setImage] = useState({});
  const [imageLoading, setImageLoading] = useState(true)
  const { loading, data, refetch } = useQuery(QUERY_LOCATIONS);
  const [addLocation, {error}] = useMutation(ADD_LOCATION);
  const spaces = data?.locations || {};

  // useEffect(() => {
  //   console.log(image);
  //   if (image.encodedImage) {
  //     setImageLoading(false);
  //     console.log("ImageLoading set to false")
  //   }
  //   else {
  //     setImageLoading(true);
  //     console.log("imageloading set to true")
  //   }
  // }, [image])

  const handleChange = async (event) => {
    event.preventDefault();
    const imageData = event.target.files[0]

    if (imageData.size > 1000000) {
      console.log("Image is larger than 1 mb")
      //throw error
    }

    try {

          let reader = new FileReader();
          reader.onloadend = function () {
          //  setImage({
          //     encodedImage: reader.result,
          //     imageName: imageData.name
          //  })
            
            image['encodedImage'] = reader.result
            image['imageName'] = imageData.name

          }
          await reader.readAsDataURL(imageData);
          
          //   console.log("Waiting for image to be set: ",image);
          //    //waiting
          // }
        }
        catch (e) {
          console.log(e);
    }
    
    console.log(image);
    
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
    <>
      <AdminHeader /> <div>Loading...</div>
    </>;
  }

  //add spaces modal
  function AddSpacesModal(props) {
    const onFormSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());

      // if (formDataObj.image.name.length) {
      //   console.log("loading image",imageLoading, image)
      //   try {

      //     let reader = new FileReader();
      //     reader.onloadend = function () {
      //       setImage({
      //         encodedImage: reader.result,
      //         imageName: formDataObj.image.name
      //       })

      //     }
      //     await reader.readAsDataURL(formDataObj.image);

      //     // while (imageLoading) {
      //     //   console.log("Waiting for image to be set: ",image);
      //     //    //waiting
      //     // }
      //   }
      //   catch (e) {
      //     console.log(e);
      //   }
      // }

      console.log(image);
      const parsedObj = {
        locationName: formDataObj.locationName,
        capacity: parseInt(formDataObj.capacity),
        ...image
      };

      props.onHide();
      await addLocation({ variables: parsedObj });
      setImage({})
      console.log("Image Loading should now be false")
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
                required
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
                required
              />
              <Form.Text className="text-muted">
                What is the capacity of this space?
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId='formNewFile'>
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
    const [updateLocation, {error: updateError}] = useMutation(UPDATE_LOCATION);
    const [deleteLocation, {error: deleteError}] = useMutation(DELETE_LOCATION);
    const handleDeleteLocation = async () => {
      try {
        let deletedLocation = await deleteLocation({
          variables: {
            locationId: editInfo.locationId
          }
        });
      }
      catch (e) {
        console.log(deleteError)
      }
      
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
        ...image
      };

      setShowEditModal(false);
      await updateLocation({ variables: parsedObj });
      setImage({})
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Space Capacity</Form.Label>
              <Form.Control
                name="capacity"
                type="number"
                placeholder="Space Capacity"
                defaultValue={editInfo.capacity}
                required
              />
              <Form.Text className="text-muted">
                What is the capacity of this space?
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId='formFile'>
              <Form.Label>Upload/Replace Image</Form.Label>
              <Form.Control
                name='image'
                type='file'
                onChange={handleChange}
                /*Come back add type and size validation */
              />
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
      <div className="container">
        <h3>Your Current Spaces</h3>
        <Create />
        {showEditModal && <EditModal />}
        <div className="d-flex flex-wrap mt-3 justify-content-evenly">
          {spaces &&
            spaces.map((space) => {
              return (
                <Card key={space._id} className="mt-3 text-center d-flex justify-content-center col-lg-3 col-md-5">
                  {space.image && <Card.Img variant="top" className='opacity-100 img-fluid' src={space.image.encodedImage} />}
                  <Card.Body>
                    <Card.Title className='m-auto'>{space.locationName}</Card.Title>
                    <Card.Text>
                        Capacity: {space.capacity}
                    </Card.Text>
                    <Button
                      variant="primary"
                      id={space._id}
                      data-capacity={space.capacity}
                      value={space.locationName}
                      className="btn col-8"
                      onClick={() => {
                        setShowEditModal(true);
                        setEditInfo({
                          locationId: space._id,
                          locationName: space.locationName,
                          capacity: space.capacity,
                      });
                      console.log(editInfo);
                      }}
                    >edit</Button>
                  </Card.Body>
                  
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SpacesList;
