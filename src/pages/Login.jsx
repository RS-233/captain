import { useState } from 'react';
import axios from 'axios'

const Login = ({onLogin}) => {

  const [busNumber, setBusNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(busNumber);  // Call the parent function to handle login
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="busNumber" className="block text-sm font-medium text-gray-700">
              Bus Number
            </label>
            <input
              type="text"
              id="busNumber"
              required
             
              onChange={(e) => setBusNumber(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter bus number"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
