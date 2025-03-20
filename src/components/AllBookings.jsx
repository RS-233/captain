/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './AllBookings.css'
import axios from 'axios'

const AllBookings = ({ busid }) => {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async (busid) => {
    try {
      const response = await axios.get(`https://backend-chi-one-67.vercel.app/api/Booking/getbusbookings/${busid}`);
      console.log(response.data);
        setBookings(response.data.busBookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (busid) {
      fetchBookings(busid);
    }
  }, [busid]); // Trigger the fetch when `busid` changes

  useEffect(() => {
    // Update location every 5 seconds
    const interval = setInterval(fetchBookings, 4000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

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
