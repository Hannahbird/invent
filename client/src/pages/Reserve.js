import React, {useState} from 'react';
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_LOCATIONS } from '../utils/queries'
import { ADD_EVENT } from '../utils/queries'
import {Card, Button} from 'react-bootstrap'

const Reserve = () => {
    //get company id
    const { id: companyParam } = useParams();
    //query locations based on companyParam
    const { loading, locations } = useQuery(QUERY_LOCATIONS, {
        variables: {
            company: companyParam
        }
    });
    //create mutation for reserving a location
    const [reserveLocation, { error }] = useMutation(ADD_EVENT);

    const { reservation, setReservation } = useState({
        eventName: '',
        location: '',
        contactName: '',
        contactInfo: '',
        eventDate: ''

    })
    console.log(companyParam)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setReservation({
            ...reservation,
            [name]: value
        })
    }

    const handleReservation = async (event) => {
        event.preventDefault();

        try {
            const { data } = await reserveLocation({
                variables: {...reservation}
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
    }

    if (loading) {
        return <div>Loading Spaces...</div>;
    }

    return (
        <div>
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
                            <Button variant="primary">Request Space</Button>
                        </Card.Body>
                    </Card>
                </>
                    )
            )}
        </div>
    )
};

export default Reserve;