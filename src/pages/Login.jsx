/* eslint-disable react/prop-types */
import { useState } from 'react';
import { assets } from '../assets/assets';
import './Login.css';

const Login = ({onLogin}) => {

  const [busNumber, setBusNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(busNumber);  // Call the parent function to handle login
  };
  console.log(busNumber);


  return (
    <div className="login">
        <div className="login-main">
          <div className="login-main-header">
            <img src={assets.busjourney} alt="" />
          <h1>Welcome Captain</h1>
          <p> </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-main-sections">
                <label htmlFor="">Bus Number</label>
                <br />
                <input className="login-main-sections-input" type="text" placeholder="Up21ABXXXX" name='email' onChange={(e) => setBusNumber(e.target.value)} required />
            </div>
            <div className="login-main-sections">
                <input type="checkbox" required /> i agree all terms and conditions
            </div>
            <div className="login-main-button">
              <button className="login-main-login-button" type='submit'><b>Login</b></button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
