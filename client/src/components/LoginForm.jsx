import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        // mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
          'Accept':'applcation/json'
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
      const token = data.token;
      console.log('User logged in successfully');
      console.log(token);

      sessionStorage.setItem('jsonwebtoken', token);

      navigate('/courses');
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleRegister = () =>{
    navigate('/register')
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div className='mt-5'>
        <h3>Please register first</h3>
      <button type="submit" className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
      </div>
    

    </div>
  );
};

export default LoginForm;
