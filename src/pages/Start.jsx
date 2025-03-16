import { useState, useEffect } from "react";
import axios from "axios";

const Start = () => {
  const [buses, setBuses] = useState([""]);
  const [busCoordinates, setBusCoordinates] = useState(null)

  const fetchBuses = async () => {
    console.log()
    try {
      const response = await axios.get(
        "http://localhost:4000/api/bus/allbuses"
      );
      setBuses(response.data.busData);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const clickButton = async(busId) => {
    console.log(busId)
    const response = await axios.post(`http://localhost:4000/api/bus/get-bus-by-id/${busId}`);
    setBusCoordinates(response.data.bus.location)
  }
  console.log(busCoordinates)

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div>
      <div className="all-buses-name">
        {buses.map((bus) => (
          <li key={bus._id} className="individual-busname">
            <div className="individual-busname-top">
              <div> {bus.busname}</div>
              <div>{bus.busnumber}</div>
              <div>{bus.bustype}</div>
            </div>
            <div className="bus-source">
              {bus.source}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bus.departuretime}
            </div>
            <div className="bus-source">
             
              {bus.destination}&nbsp;&nbsp;&nbsp;&nbsp;{bus.arivaltime}
            </div>
            <div className="bus-price">
              
              {bus.price}
            </div>

            <br />
            <button
              onClick={() => { }}
              className="bus-edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => { }}
            ></button>

            <button
              onClick={() => clickButton(bus._id)}
              className="delet-edit-button"
            >
              locate bus location
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Start;
