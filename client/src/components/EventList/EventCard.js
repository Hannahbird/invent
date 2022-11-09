
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
function EventCard({ event }) {

    return (<div className="col-sm-12 col-md-6">
        <div key={event._id} className="card mt-3">
            <Link to={`/event/${event._id}`}>
                <div className="card-header border-0 text-black">
                    <p>{event.eventName}</p>
                </div>
                <div className="card-body row text-black">
                    <div className="main-body">
                        <div className="main-body-meeting-info">
                            <div className="main-body-date">
                                <span className="main-body-dateDay">
                                    {dayjs(event.eventStartDate).format('DD')}
                                </span>
                                <span className="main-body-dateMonth">
                                    {dayjs(event.eventStartDate).format('MMM')}
                                </span>
                            </div>
                            <div className="main-body-event">
                                <span className="main-body-location">
                                    {event.location.locationName}
                                </span>
                                <span className="main-body-time">
                                    {dayjs(event.eventStartDate).format('hh:mm A')} -{' '}
                                    {dayjs(event.eventEndDate).format('hh:mm A')}{' '}
                                </span>
                            </div>
                        </div>
                        <div className="main-body-contact">
                            <span>{event.contactName}</span>
                            <span>{event.contactInfo}</span>
                        </div>
                        <div className="main-body-eventState">
                            <span>Event Status: {event.eventState}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </div>)
}

export default EventCard