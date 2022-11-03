import React, {useState} from 'react';
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_LOCATIONS } from '../utils/queries'
import { ADD_EVENT } from '../utils/queries'
import { Card, Button, Modal, Form } from 'react-bootstrap'
import DateTime from '../utils/dateTime/dateTime';

const Reserve = () => {
    //get company id
    const { id: companyParam } = useParams();
    //query locations based on companyParam
    const locations = []
    // const { loading, locations } = useQuery(QUERY_LOCATIONS, {
    //     variables: {
    //         company: companyParam
    //     }
    // });
    //create mutation for reserving a location
    //const [reserveLocation, { error }] = useMutation(ADD_EVENT);

    //reserve form modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //track state of reservation
    const [ reservation, setReservation ] = useState({
        eventName: '',
        location: '',
        contactName: '',
        contactInfo: '',
        eventDate: ''

    })
    console.log(companyParam)

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target)
        setReservation({
            ...reservation,
            [name]: value,
        })

        console.log(reservation);
    };
    

    const handleReservation = async (event) => {
        event.preventDefault();

        try {
            // const { data } = await reserveLocation({
            //    variables: {
            //    eventState: 'Pending'.
            //    ...reservation}
            // })
        }
        catch (e) {
            // console.error(error);
        }

        setReservation({
        eventName: '',
        contactName: '',
        contactInfo: '',
        eventDate: ''
        })
    }

    const loadReserveForm = (locationId, locationName) => {
        setReservation({
            ...reservation,
            location: locationId
        })
        handleShow();

    }

    // if (loading) {
    //     return <div>Loading Spaces...</div>;
    // }

    return (
        <div className='container d-flex flex-wrap justify-content-evenly'>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reservation Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formContact">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="input"
                                    placeholder="Enter your name"
                                    name='contactName'
                                    value={reservation.contactName}
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Contact Info</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='contactInfo'
                                    placeholder="Provide the best way to contact you"
                                    value={reservation.contactInfo}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventName">
                                <Form.Label>Event Name/Description</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='eventName'
                                    placeholder="Enter a brief name for your event"
                                    value={reservation.eventName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>Desired Date/Time</Form.Label>
                                <DateTime
                                    className="form-control"
                                    name='eventDate'
                                    value={reservation.eventDate}
                                    onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            Rendering Reserve Content Successfully
            {locations && locations.map(location => (
                <>
                    <div>{location.locationName}</div>
                    
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{location.locationName}</Card.Title>
                            <Card.Text>
                                Capacity: {location.capacity}
                        </Card.Text>
                            <Button variant="primary" id={location._id} onClick={loadReserveForm(location._id, location.locationName)}>Request Space</Button>
                        </Card.Body>
                    </Card>
                </>
                    )
            )}
        </div>
    )
};

export default Reserve;