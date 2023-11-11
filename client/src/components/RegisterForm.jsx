import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function Register() {
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the new course data
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    email: '',
    department: '',
  });

  console.log(newUserData)
  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      });
      console.log(newUserData)
      if (response.ok) {


        handleClose();
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        console.error('Failed to regsiter');
      }
    } catch (error) {
      console.error('Error:', error);
      console.error('Error:', error.message);
    }
  };
  const handleSaveChangesAdmin = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      });
      console.log(newUserData)
      if (response.ok) {


        setLgShow(false)
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        console.error('Failed to regsiter');
      }
    } catch (error) {
      console.error('Error:', error);
      console.error('Error:', error.message);
    }
  };


  const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/getAll ', {
        method: 'POST', // Use GET to fetch the courses
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.body);
        setLoading(false);
      } else {
        console.error('Failed to load courses');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>

      <div className='container mt-5'>
        <Button onClick={() => setLgShow(true)} className="me-2">Admin Register</Button>

        <Button variant="primary" onClick={handleShow}>
          Register a User
        </Button>

        <Modal
          show={show}
          onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Admin Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={newUserData.username}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, username: e.target.value })
                  }
                />
              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  value={newUserData.password}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={newUserData.email}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  type="text"
                  value={newUserData.details}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, details: e.target.value })
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


        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Register an Admin
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={newUserData.username}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, username: e.target.value })
                  }
                />
              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  value={newUserData.password}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={newUserData.email}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  type="text"
                  value={newUserData.details}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, details: e.target.value })
                  }
                />
              </Form.Group>


            </Form>

          </Modal.Body>

          <Button variant="primary" onClick={handleSaveChangesAdmin}>
            Save Changes
          </Button>
        </Modal>


        <Table responsive="sm">
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Email</th>
            {/* <th>Department</th> */}
            <th>Admin</th>
            
          </tr>
        </thead>
        <tbody>
          
            {users.map((user, index) => (
              <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {/* <td>{user.department}</td> */}
              <td>{user.isAdmin? 'Admin':'User'}</td>
              
                </tr>
            ))}
            
          
    
        </tbody>
      </Table>

      </div>

    </>
  );
}

export default Register;