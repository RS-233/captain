/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './AllBookings.css'
import axios from 'axios'

const AllBookings = ({ busid }) => {

  const [bookings, setBookings] = useState([]);

  const busId = busid;

  const fetchBookings = async (bus) => {
    try {
      const response = await axios.get(`https://backend-chi-one-67.vercel.app/api/Booking/getbusbookings/${bus}`);
      console.log(response.data);
        setBookings(response.data.busBookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (busId) {
      fetchBookings(busId);
    }
  }, [busId]); // Trigger the fetch when `busid` changes

  useEffect(() => {
    // Update bookings every 4 seconds, if busid is available
    if (busId) {
      console.log(busId)
      const interval = setInterval(() => fetchBookings(busId), 4000);
      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [busid]);

  return (
    <div className="allBookings">
      <div className="allBookings-Heading">show tickets</div>
      <div className="ticket-list">
        {bookings.length > 0 ? (
          bookings.map((ticket, index) => (
            <div key={index}>
              {ticket.passengers.map((passenger, index) => (
                <div key={index} className='passenger-ticket'>
                  <p>Name: {passenger.passengername}</p>
                  <p>Gender: {passenger.passengergender}</p>
                  <p>Seat No.: {passenger.seats}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No bookings available.</p> // Display message if no bookings
        )}
      </div>
    </div>
  );
};

export default AllBookings;
