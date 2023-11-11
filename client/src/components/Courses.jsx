import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Navbar from './TopBar'

import { jwtDecode } from "jwt-decode";


const Courses = () => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  // Retrieve the JWT token from session storage
  const jwtToken = sessionStorage.getItem('jsonwebtoken');
  const token = jwtDecode(jwtToken);
  console.log("token is ",token)
  const userId = token.user
  
const url = `http://localhost:5000/users/update?id=${userId}`;



  //console.log(token)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/course/delete?id=${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })
      if (response.status == 200) {
        alert('COurse deleted')
        loadCourses();
      }
      else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      // Handle network error and set an error message
      setErrorMessage('Network error. Please try again later.');
    }
  }


  const[data,setData] = useState({
    course: ''
  })
  //Enroll handle
  const handleEnroll = async (id) => {
    console.log("course id is ", id)
    console.log("user id is ", userId)
    try {
      const requestBody = {
        course: id
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(requestBody), // Convert the object to a JSON string
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        alert('Enrollment successful');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    }
}


  const loadCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/course/show', {
        method: 'GET', // Use GET to fetch the courses
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data.body);
        setLoading(false);
      } else {
        console.error('Failed to load courses');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // State for the new course data
  const [newCourseData, setNewCourseData] = useState({
    name: '',
    category: '',
    details: '',
    price: '',
  });

  // Handler for the "Save Changes" button in the modal
  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/course/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourseData),
      });

      if (response.ok) {
        // Course added successfully, reload the courses
        loadCourses();
        handleClose();
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        console.error('Failed to add a new course');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="container">
        <h2>Courses</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Details</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.category}</td>
                  <td>{course.details}</td>
                  <td>${course.price}</td>
                  <td>

                    {token.isAdmin ?
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDelete(course._id)}
                      >
                        Delete
                      </button> :
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEnroll(course._id)}

                        
                      > Enroll </button>
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {token.isAdmin ?
          <Button variant="primary" className="text-center" onClick={handleShow}>
            Add New Course
          </Button>
          :
          <></>
        }

      </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Course name"
                value={newCourseData.name}
                onChange={(e) =>
                  setNewCourseData({ ...newCourseData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newCourseData.category}
                onChange={(e) =>
                  setNewCourseData({ ...newCourseData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Live course">Live course</option>
                <option value="Recorded course">Recorded course</option>

              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                value={newCourseData.details}
                onChange={(e) =>
                  setNewCourseData({ ...newCourseData, details: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newCourseData.price}
                onChange={(e) =>
                  setNewCourseData({ ...newCourseData, price: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Courses;
