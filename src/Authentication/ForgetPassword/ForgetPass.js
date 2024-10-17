import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Icon from '../../Website/Assets/vortex_icon.png';
import Swal from 'sweetalert2';

import { Row } from 'react-bootstrap';
import apiService from '../../apiService';

// Main function starts here

function ForgetPass() {
  const navigate = useNavigate(); // to navigate to desired pages
  const [cons, setCons] = useState(false) // Enabling and Disabling the Login Button
  const [formData, setFormData] = useState({ // To handle the Form Data and reseting the Form Data
    username: '',
    password: '',
    repassword:''
  });

  // Handling changes in form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if(formData.username.length>=3){
      setCons(true)
    }else{
      setCons(false)
    }
  };
  
  // Handling Form Submit
  const handleSubmit = (e) => {
    console.log(cons)
    e.preventDefault(); // Preventing form to submit blank values.
    document.getElementById('submit').setAttribute('disabled','disabled')
    if (cons === true) {
      apiService.post('/api/v1/auth/rePass',formData) //Linking and sending data to backend server's user's database
      .then(response => { // Handling Server Response
        if(response.data.title === "Password Reset Instructions Sent"){
          Swal.fire({
            title: response.data.title,
            text: response.data.message,
            icon: "success"
          });
          document.getElementById("swal2-checkbox").style.display = "none";
            navigate("/") // Navigate to Home page
        }else if(response.data.title === "Something went wrong."){
          Swal.fire({
            title: response.data.title,
            text: response.data.message,
            icon: "error"
          });
          document.getElementById("swal2-checkbox").style.display = "none";
        }else{
          Swal.fire({
            title: "Invalid Credentials",
            text: response.data.message,
            icon: "error"
          }).then((result) => {
            document.getElementById('submit').removeAttribute('disabled')
          });
          document.getElementById("swal2-checkbox").style.display = "none";
        }
      })
      .catch(error => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again.",
          icon: "error"
        }).then((result) => {
          document.getElementById('submit').removeAttribute('disabled')
        });
        document.getElementById("swal2-checkbox").style.display = "none";
      });
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Validate your details.",
        icon: "warning"
      });
      document.getElementById("swal2-checkbox").style.display = "none";
    }
  };


  return (
    <>
      <div className="fPass-div flex">
        <Card style={{  }} className='fPass-card'>
          <Link to={'/'}>
              <img variant="top" alt="icon" src={Icon} className="login-img" />
          </Link>
          <Card.Body>
            <h2 style={{}}>Forgot Your Password?</h2>
            <Card.Text>
                Don’t worry! Just follow the steps sent to your email <br /> to easily reset your password and get back on track.
            </Card.Text>
              <hr style={{color:'#011801', border: '2px solid'}} />
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group className="mb-3" controlId="Email">
                    <Form.Label className="mb-3 label">Registered Email</Form.Label>
                    <Form.Control className='shadow input-login-signup' type="email" name='username' autoComplete='off'  value={formData.username} onChange={handleChange} required />                  
                  </Form.Group>
                </Row>
                
                <Row className='mb-2'>
                  <Link style={{textAlign:'right', fontSize:'1.2rem', color:'#daa520', textDecorationLine:'none'}} to={'/login'}>Login Now</Link>
                </Row>
                {
                  <Button variant={cons ? "success":"danger"} className='mb-4' type="submit" id='submit'>
                    Send Instructions
                  </Button>
                }
              </Form>
              
          </Card.Body>
        </Card>
        
      </div>
    </>
  )
}

export default ForgetPass
