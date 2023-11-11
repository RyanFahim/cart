// MyCourses.js
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import Navbar from './TopBar'


const MyCourses = ({ token }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);


  // Retrieve the JWT token from session storage
  const jwtToken = sessionStorage.getItem('jsonwebtoken');
  const myToken = jwtDecode(jwtToken);
  console.log("token is ",myToken)
  const userId = myToken.user
  
const url = `http://localhost:5000/users/getIndividual?id=${userId}`;

  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const response = await fetch(url,{
            method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
          setCourses(data.body[0].course);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

    <Navbar/>
    
    
    {error ? (
      <p>{error}</p>
    ) : (
        <div className='container'>
          <h2 className='mt-5 mb-5'>My Courses</h2>
             <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Category</th>
            <th>Details</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.category}</td>
              <td>{course.details}</td>
              <td>${course.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
     
    )}
  </div>
  );
};

export default MyCourses;
