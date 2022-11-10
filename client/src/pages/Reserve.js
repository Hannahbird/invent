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
    const handleClose = () => {
        setShow(false)
        setReservation({
        eventName: '',
        contactName: '',
        contactInfo: '',
        eventStartDate: '',
        eventEndDate: ''
        })
    };
    const handleShow = () => {
        setShow(true)
        setConfirmed(false);
    };
    const [confirmed, setConfirmed] = useState(false);

    //track state of reservation
    const [ reservation, setReservation ] = useState({
        eventName: '',
        location: '',
        contactName: '',
        contactInfo: '',
        eventStartDate: '',
        eventEndDate: ''

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
            setConfirmed(true)
        }
        catch (e) {
            console.error(error);
        }

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
                        {<Form>
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
                                    startDate={reservation.eventStartDate}
                                    endDate={reservation.eventEndDate}
                                    stateMgr={setReservation}
                                    stateObj={reservation}
                                />
                            </Form.Group>
                        </Form>}
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
                <div className="container">
                    
                    {confirmed ?
                        <div className="justify-content-center">
                        <p className='display-3 opacity-75'>Your request was successfully submitted, the event coordinator will contact you soon</p>
                        <Button variant="secondary" className="btn-warning" onClick={() => setConfirmed(false)}>Return to Reservations</Button>
                        </div>
                        :
                        <h2 className='text-center'>Select and request a space for your event at {company.title}</h2>
                    }
                </div>
                {!confirmed &&
                    <div className="container d-flex flex-wrap mt-3 justify-content-evenly">
                    {locations.map(location => (               
                            <Card className="mt-3 text-center d-flex justify-content-center col-lg-3 col-md-5" key={location._id}>
                                {location.image && <Card.Img variant="top" className='opacity-100 img-fluid' src={location.image.encodedImage} />}
                                <Card.Body>
                                    <Card.Title>{location.locationName}</Card.Title>
                                    <Card.Text>
                                        Capacity: {location.capacity}
                                </Card.Text>
                                    <Button variant="primary" className="btn-warning col-8" onClick={() => {loadReserveForm(location._id, location.locationName)}}>Request Space</Button>
                                </Card.Body>
                            </Card>
                    ))}
                    </div>}
            </div>
        </div>
    )
};

export default Reserve;