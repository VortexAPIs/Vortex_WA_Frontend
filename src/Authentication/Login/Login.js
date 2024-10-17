import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form, Row } from "react-bootstrap";
import Icon from "../../Website/Assets/vortex_icon.png";
import './Login.css'
import Swal from "sweetalert2";
import socket from "../../socketManager";
import apiService from "../../apiService";


// Main function starts here

function Login() {
  
  // const [coords, setCoords] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); // to navigate to desired pages
  const [formData, setFormData] = useState({
    // To handle the Form Data and reseting the Form Data
    username: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false); // Setting the log in status of the user

  // Handling changes in form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Handling Form Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing form to submit blank values.
    // console.log(formData);
    document.getElementById('loginButton').setAttribute('disabled','disabled')
    document.getElementById('loginButton').textContent ='Please Wait ...'
    try {
      apiService.post('/api/v1/auth/login', formData) //Linking and sending data to backend server's user's database
        .then((response) => {
          // console.log(response);
          // Handling Server Response
          if (response.data.message === "Login Successful") {
            // console.log(response.data.Token);
            const token = response.data.Token; // Storing the token in a variable
            // console.log(token);
            try {
              const headers = {
                "auth-token": token,
              };
              const data = {
                "Token": token,
              }
              // console.log(headers);
              apiService.post('/api/v1/auth/fetchUser', data, {
                  headers: headers,
                })
                .then((respo) => {
                  // console.log(respo);
                  if (!respo.data) {
                    Swal.fire({
                      title: "Invalid Credentials",
                      text: "Please enter valid credentials",
                      icon: "error",
                    });
                    document.getElementById("swal2-checkbox").style.display = "none";
                  } else {
                    setLoggedIn(true);
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("user", respo.data.name);
                    localStorage.setItem("mobile", respo.data.mobile);
                    localStorage.setItem("email", respo.data.email);
                    localStorage.setItem("uuid", respo.data.uuid);
                    localStorage.setItem("insID", respo.data.insID);
                    localStorage.setItem("uName", respo.data.username);
                    localStorage.setItem("role", respo.data.mem_type);

                    try {
                      const d = {
                        uuid: respo.data.uuid,
                        insID: respo.data.insID
                      }
                      apiService.post('/api/v1/dash/wa/fetchInstance', d)
                      .then((res) => {
                        // console.log(res.data);
                        // console.log(localStorage.getItem('role'))
                        if(localStorage.getItem('role') !== 'user'){
                          navigate("/dashboard")
                        }
                        else if(res.data.message === "Instance Found") {
                          navigate("/dashboard");
                        } else {
                          const data = {
                            uuid : respo.data.uuid,
                            insID: respo.data.insID,
                            name: 'Admin'
                          }
                          apiService.post('/api/v1/dash/wa/createInstance', data)
                         .then((result) => {
                            // console.log(result);
                            if(result.data.message === "Instance Created"){
                              // setInstanceData(respo.data.result);
                              Swal.fire({
                                title: result.data.message,
                                text: "You can now proceed with Vortex WhatsApp API.",
                                icon: "success",
                                confirmButtonText: "OK",
                                allowOutsideClick: false,
                              }).then((results) => {
                                if (results.isConfirmed) {
                                  socket.emit('fetchInstance', {uuid: localStorage.getItem("uuid")})
                                }
                              });
                              document.getElementById("swal2-checkbox").style.display = "none";
                              navigate("/dashboard"); // Navigate to Home page
                              // Reseting the form data to blank
                              setFormData({
                                username: "",
                                password: "",
                              });
                            }else{
                              Swal.fire({
                                title: result.data.message,
                                text: "Unable to create instance. Please try login again.",
                                icon: "error",
                                confirmButtonText: "OK",
                              }).then((resp) => {
                                if (resp.isConfirmed) {
                                  navigate("/login"); // Navigate to Login page
                                }
                              })
                              document.getElementById("swal2-checkbox").style.display = "none";
                            }
                          })
                        }
                      })

                    }catch (error) {
                      Swal.fire({
                        title: "Instance Creation Error",
                        text: "Unable to create instance. Please try login again.",
                        icon: "error",
                        confirmButtonText: "OK",
                      }).then((response) => {
                        if (response.isConfirmed) {
                          navigate("/login"); // Navigate to Home page
                        }
                      })
                    }
                  }
                });
            } catch (error) {
              Swal.fire({
                title: "Data Error",
                text: "Unable to fetch User Details. Please try again.",
                icon: "error",
              });
              document.getElementById("swal2-checkbox").style.display = "none";
            }
          } else {
            Swal.fire({
              title: "Invalid Credentials",
              text: response.data.message,
              icon: "error",
            });
            document.getElementById("swal2-checkbox").style.display = "none";
          }
        });
    } catch (error) {
      // console.error("Error sending form data:", error);
    }
  };

  // Setting user logged in status and storing to localstorage
  useEffect(() => {
    // const storedLoggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true" && localStorage.getItem('role') === 'user') {
      navigate("/dashboard"); // Navigate to Home page
    }else if(loggedIn === "true" && localStorage.getItem('role') === 'Admin'){
      navigate("/dashboard")
    }else if(loggedIn === "true" && localStorage.getItem('role') === 'CRM'){
      navigate("/dashboard")
    }else{
      navigate("/login")
    }
  }, [loggedIn, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="login-div flex">
      <div className='row' style={{minWidth:'100%'}}>
        <div className='col'>
        <div className="login-text">
          {/* <h3>Welcome Back to Vortex!</h3> */}
          <div className="vl" style={{ borderLeft: '5px solid #fff', height: '50px', position: 'relative', marginLeft: '-10px', transform: 'translateY(40px)', background: 'linear-gradient(90deg, #ffffffb3, transparent)'}}></div>
          <h3 style={{color: '#FF8C00', position:'relative', zIndex:'100'}}>Continue enjoying our premium services:</h3>
          <ul>
              <li><strong>Seamless WhatsApp Messaging:</strong> Effortlessly send, receive, and manage messages.</li>
              <li><strong>Real-Time Automation:</strong> Stay ahead with our automated API for smooth interactions.</li>
              <li><strong>Multi-Device Connectivity:</strong> Access your WhatsApp on multiple devices simultaneously.</li>
              <li><strong>Advanced Security:</strong> Rest easy knowing your data and communication are protected.</li>
              <li><strong>Instant Notifications:</strong> Get real-time updates on message deliveries and statuses.</li>
          </ul>
          <p>We are committed to providing the best messaging experience. Log in now to continue where you left off!</p>
        </div>
        </div>
        <div className="col">
        <Card style={{}} className="login-card">
          <Link to={'/'}>
              <img variant="top" alt="icon" src={Icon} className="login-img" style={{}} />
          </Link>
          <Card.Body>
            <h2 style={{  color: "black" }}>
              Welcome Back!
            </h2>
            <Card.Text style={{ }}>
              Login to your Vortex API's Dashboard.
            </Card.Text>
            <hr style={{color:'#011801', border: '2px solid'}} />
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group className="mb-3" controlId="Email">
                  <Form.Label className="mb-3 label">
                    Email Or Username
                  </Form.Label>
                  <Form.Control
                    className="shadow input-login-signup"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="Password">
                  <Form.Label className="mb-3 label">Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      className="shadow input-login-signup"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      style={{}}
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {showPassword ? (
                      <span
                        className="material-symbols-outlined mt-2"
                        style={{
                        //   color: "#ffffff",
                          cursor: "pointer",
                          marginLeft: "-30px",
                          fontSize: "2rem",
                          zIndex:'1000'
                        }}
                        onClick={togglePasswordVisibility}
                      >
                        visibility_lock
                      </span>
                    ) : (
                      <span
                        className="material-symbols-outlined mt-2"
                        style={{
                        //   color: "#ffffff",
                          cursor: "pointer",
                          marginLeft: "-30px",
                          fontSize: "2rem",
                          zIndex:'1000'
                        }}
                        onClick={togglePasswordVisibility}
                      >
                        visibility
                      </span>
                    )}
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Link
                  style={{
                    textAlign: "right",
                    fontSize: "1rem",
                    color: "red",
                    textDecorationLine: "none",
                  }}
                  to={"/forget"}
                >
                  Forgot your password?
                </Link>
              </Row>
            
              <div className="" style={{textAlign:'left', display:'flex'}}>
                  <input className="form-check-input shadow" type="checkbox" value="" id="flexCheckDefault" style={{}} required />
                  <span style={{ transform: 'translateY(0%)', textAlign:'right !important', justifyContent: 'right !important' }}>
                    &nbsp;By signing in you agree to our 
                    <Link style={{ textDecorationLine: 'none',fontSize: '1.2rem', color: 'orange', textAlign:'right', transform:'translateY(-72%)' }} to={"/privacy"} target="_blank" >
                      &nbsp;Privacy Policy
                    </Link>
                  </span>
                </div>
              {
                <Button
                  variant={
                    formData.username && formData.password
                      ? "success"
                      : "danger"
                  }
                  className="mb-4"
                  type="submit"
                  id="loginButton"
                >
                  Login
                </Button>
              }
              <Form.Group className="mb-4" controlId="login">
                  <Form.Text style={{color:'black'}} className=''>
                    Don't have an account? <Link to={'/signup'} style={{fontSize:'1.2rem', textDecorationLine:'none', color:'yellowgreen'}}>Register Now</Link>
                  </Form.Text>
                </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        </div>
        </div>
      </div>
    </>
  );
}

export default Login;
