import React, {useState} from 'react';
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_LOCATIONS_BYCODE } from '../utils/queries'
import { ADD_EVENT } from '../utils/mutations'
import { Card, Button, Modal, Form } from 'react-bootstrap'
import DateTime from '../utils/dateTime/dateTime';

const Reserve = () => {
    //get company id
    const { id: codeParam } = useParams();
    //query locations based on reserveCode

    const { loading, data} = useQuery(QUERY_LOCATIONS_BYCODE, {
        variables: {
            code: codeParam
        }
    });

    const { locations, company } = data?.locationsByCode || {};
    //create mutation for reserving a location
    const [reserveLocation, { error }] = useMutation(ADD_EVENT);

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

    const handleChange = (event) => {
        const { name, value } = event.target;

        console.log(reservation.eventDate);

        setReservation({
            ...reservation,
            [name]: value,
        })

    };
    

    const handleReservation = async (event) => {
        event.preventDefault();

        try {
            const { status } = await reserveLocation({
               variables: {
               eventState: 'Pending',
               ...reservation}
            })
        }
        catch (e) {
            console.error(error);
        }

        setReservation({
        eventName: '',
        contactName: '',
        contactInfo: '',
        eventDate: ''
        })

        handleClose()
    }

    const loadReserveForm = (locationId, locationName) => {
        setReservation({
            ...reservation,
            location: locationId
        })
        handleShow();

    }

    if (loading) {
        return <div>Loading Spaces...</div>;
    }

    return (
        <div>
            <header className="mb-4 py-2 flex-row header align-center">
                <div className="header flex-row justify-space-between-lg justify-flex-end align-left">
                    <Link to="/">
                    <h1>InVent</h1>
                    </Link>

                </div>
            </header>
        
        <div className='container d-flex flex-wrap justify-content-evenly'>
                {/*<Button variant="primary" onClick={handleShow}>
                    Launch demo modal
    </Button>*/}
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
                        <Button variant="primary" onClick={handleReservation}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
                <div className="container justify-content-center d-flex">
                    <h2>Select and request a space for your event at {company.title}</h2>
                </div>
                <div className="d-flex flex-wrap justify-content-evenly mt-3">
                    {locations.map(location => (               
                            <Card className="mt-3" key={location._id} style={{ width: '10rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{location.locationName}</Card.Title>
                                    <Card.Text>
                                        Capacity: {location.capacity}
                                </Card.Text>
                                    <Button variant="primary" onClick={() => {loadReserveForm(location._id, location.locationName)}}>Request Space</Button>
                                </Card.Body>
                            </Card>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Reserve;