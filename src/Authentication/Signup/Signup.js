import React, {useCallback, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Button, Card, Form, Row, Col} from 'react-bootstrap';
import Icon from '../../Website/Assets/vortex_icon.png';
import '../Login/Login.css'
import Swal from 'sweetalert2';

import apiService from "../../apiService";

function Signup() {
  
  const [captcha, setCaptcha] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);
  const [result, setResult] = useState(null)
  const [passwordFocused, setPasswordFocused] = useState(false);
  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = () => setPasswordFocused(false);

  const navigate = useNavigate(); // to navigate to desired pages
  const [cons, setCons] = useState(false) // Enabling and Disabling the Login Button
  const token = process.env.REACT_APP_ADMIN_TOKEN;
  const key = process.env.REACT_APP_ADMIN_KEY;
  const [formData, setFormData] = useState({ // To handle the Form Data and reseting the Form Data
    name: '',
    username: '',
    email:'',
    mobile:'',
    password: '',
    repassword:''
  });
  // const [loggedIn, setLoggedIn] = useState(false); // Setting the log in status of the user
  const chkUsername = (e) => {
    const {name, value} = e.target;
    const data = {
      [name]: value
    }
    // console.log(data)
    apiService.post('/api/v1/auth/chkusername',data)
      .then(response =>{
        if(response.data.message === "Username already taken."){
          const usrSpan = document.getElementById("usernameSpan")
          usrSpan.hidden = false;
          usrSpan.textContent = response.data.message;
          usrSpan.style.color = 'red';
        }else{
          const usrSpan = document.getElementById("usernameSpan")
          usrSpan.hidden = false;
          usrSpan.textContent = response.data.message;
          usrSpan.style.color = 'green';
        }
      })
  }

  const chkEmail = (e) => {
    const {name, value} = e.target;
    const data = {
      [name]: value
    }
    // console.log(data)
    apiService.post('/api/v1/auth/chkemail',data)
      .then(response =>{
        if(response.data.message === "Email already registered."){
          const usrSpan = document.getElementById("emailSpan")
          usrSpan.hidden = false;
          usrSpan.textContent = response.data.message;
          usrSpan.style.color = 'red';
        }else{
          const usrSpan = document.getElementById("emailSpan")
          usrSpan.hidden = false;
          usrSpan.textContent = response.data.message;
          usrSpan.style.color = 'green';
        }
      })
  }

  // Handling changes in form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if(formData.username.length>3 && formData.password.length>3){
      setCons(true)
    }else{
      setCons(false)
    }
  };

  const [passwordValidity, setPasswordValidity] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isAtLeast8Chars: false,
  });

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });

    setPasswordValidity({
      hasLowercase: /[a-z]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecialChar: /[^A-Za-z0-9]/.test(value),
      isAtLeast8Chars: value.length >= 8,
    });
  };

  const checkNumber = async () => {
    const mobile = document.getElementById('Mobile').value;
    let data ={}
    const headers = {
        "key": key,
    };
    apiService.post(`/api/v1/dash/checknumberstatus?insid=${token}&number=${mobile}`,data,{
        headers: headers,
    })
    .then((data) => { 
        console.log(data)       
        setResult(data.data.result);
        console.log(data.data.result)
    });
  }
  const machPassword= (e) => {
    const {name, value} = e.target
    const pass = formData.password;
    // console.log(pass)
    if(pass === value && name === "repassword"){
      const passSpan = document.getElementById("pMatched")
      passSpan.hidden = false;
      passSpan.textContent = "Password matched";
      passSpan.style.color = 'green';
      passSpan.style.backgroundColor = 'white';
    }else{
      const passSpan = document.getElementById("pMatched")
      passSpan.hidden = false;
      passSpan.textContent = "Password not matched";
      passSpan.style.color ='red';
      passSpan.style.backgroundColor = 'white';
    }
  }
  
  // Handling Form Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing form to submit blank values.    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        title: "Invalid Email Address",
        text: "Please validate the details you have entered.",
        icon: "error"
      });
      document.getElementById("swal2-checkbox").style.display = "none";
      return;
    }
    if (cons === true && captchaValid) {
      document.getElementById('signupButton').setAttribute('disabled','disabled')
      document.getElementById('signupButton').textContent ='Please Wait ...'
      apiService.post('/api/v1/auth/signup',formData) //Linking and sending data to backend server's user's database
      .then(response => { // Handling Server Response
        if(response.data.message === "Signup Successful"){
             // Navigate to Home page
            // Reseting the form data to blank
            Swal.fire({
              title: "Signup Successful",
              html: `Welcome aboard, ${formData.name}! 🎉<br />
                    Your trial account is live and ready to go! 🚀<br />
                    Check your email and WhatsApp for your login details and next steps. Let's get started!`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result)=>{
              if (result.isConfirmed) {
                setFormData({
                  name: '',
                  username: '',
                  email:'',
                  mobile:'',
                  password: '',
                  repassword:'',
                  captcha:''
                });
                navigate("/login")
              }
            });
            
            document.getElementById("swal2-checkbox").style.display = "none";
        }else{
          Swal.fire({
            title: "Signup Failed",
            html: response.data.message,
            icon: "error"
          });
          document.getElementById("swal2-checkbox").style.display = "none";
        }
      })
      .catch(error => {
        // console.error('Error sending form data:', error);
      });
    } else {
      Swal.fire({
        title: "Invalid Details",
        text: "Please validate the details you have entered.",
        icon: "warning"
      });
      document.getElementById("swal2-checkbox").style.display = "none";
    }
  };

  const handleCaptchaChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, captcha: value });
    setCaptchaValid(value === formData.captchaImage.text);
    // console.log(captchaValid)
  };
  const generateCaptcha = useCallback( async () => {
    try {
      const response = await apiService.get('/api/v1/auth/captcha');
      // console.log(response.data);
      setFormData({ ...formData, captchaImage: response.data.captcha });
      setCaptcha(response.data.captcha);
      // console.log(response.data.data);
    } catch (error) {
      // console.error("Error generating captcha:", error);
    }
    // eslint-disable-next-line
  },[]);

  const reloadCaptcha = () => {
    generateCaptcha();
  };
    
  // Load captcha image on component mount
  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showRePassword, setReShowPassword] = useState(false);
  const toggleRePasswordVisibility = () => {
    setReShowPassword((prevShowRePassword) => !prevShowRePassword);
  };

  return (
    <>
      <div className="signup-div flex">
        <div className='row' style={{minWidth:'100%'}}>
          <div className='col'>
        <div className='signup-text' style={{}}>
            {/* <h3 style={{color: '#FF8C00'}}>Why Join Vortex?</h3> */}
            <div className="vl" style={{ borderLeft: '5px solid #fff', height: '50px', position: 'relative', marginLeft: '-10px', transform: 'translateY(40px)', background: 'linear-gradient(90deg, #ffffffb3, transparent)'}}></div>
            <h3 style={{color: '#FF8C00', position:'relative', zIndex:'100'}}>By signing up, you'll get access to:</h3>
            <ul>
                <li><strong>Seamless WhatsApp Integration:</strong> Send, receive, and track messages with ease.</li>
                <li><strong>Multi-Device Support:</strong> Control WhatsApp across multiple devices effortlessly.</li>
                <li><strong>Automation at its Best:</strong> Manage messages, groups, and statuses automatically with our powerful API.</li>
                <li><strong>99.98% Uptime:</strong> Experience uninterrupted service for mission-critical operations.</li>
                <li><strong>Customizable Webhooks:</strong> Get real-time notifications for message delivery and status updates.</li>
            </ul>
            <p>Don't miss out on enhancing your communication flow. Sign up now and start automating your WhatsApp interactions!</p>
        </div>
        </div>
        <div className='col'>
        <Card style={{  }} className='signup-card'>
          <Link to={'/'}>
            <img variant="top" alt="icon" src={Icon} className="login-img" style={{}} />
          </Link>
          <Card.Body>
            <h2 style={{transform:'translateY(0%)', color:'black'}}>Let's Get You On Board!</h2>
            <Card.Text style={{color:'black'}}>
              Exciting things await us. Let’s dive into the world of automation!
              </Card.Text>
              <hr style={{color:'#011801', border: '2px solid'}} />
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg='6' sm='12'>
                    <Form.Group className="mb-2" controlId="Name">
                      <Form.Label className="mb-4 label">Name</Form.Label>
                      <Form.Control type="text" name='name' className='shadow input-login-signup' value={formData.name} onChange={handleChange} required />                      
                    </Form.Group>
                  </Col>
                  <Col lg='6' sm='12'>
                    <Form.Group className="mb-2" controlId="Username">
                      <Form.Label className="mb-4 label">Username</Form.Label>
                      <Form.Control type="text" name='username' className=' shadow input-login-signup' value={formData.username} onChange={handleChange} onBlur={chkUsername} autoComplete='off' required />
                      <span id='usernameSpan' style={{fontSize:'1rem'}}></span>   
                    </Form.Group>                  
                  </Col>
                </Row>
                <Row>
                  <Col lg='6' sm='12'>
                    <Form.Group className="mb-2" controlId="Email">
                      <Form.Label className="mb-4 label">Email</Form.Label>
                      <Form.Control type="text" name='email' className=' shadow input-login-signup' value={formData.email} onChange={handleChange} onBlur={chkEmail} autoComplete='off' required />
                      <span id='emailSpan' style={{fontSize:'1rem'}}></span>                     
                    </Form.Group>
                  </Col>
                  <Col lg='6' sm='12'>
                    <Form.Group className="mb-2" controlId="Mobile">
                      <Form.Label className="mb-4 label">Mobile No (With Country code without + sign)</Form.Label>
                      <Form.Control type="text" name='mobile' className=' shadow input-login-signup' value={formData.mobile} onChange={handleChange} onBlur={checkNumber} required />
                      <span id='mobileSpan' style={{fontSize:'1rem',color:`${result === true ? 'Green' : 'red'}`}}>{result === true ? 'Mobile number is valid and registered with WhatsApp.' : 'Mobile number not valid or registered with WhatsApp.'}</span>
                      <br />                   
                      <span id='mobileSpan' style={{fontSize:'0.8rem'}}>Enter your number with country code without '+'</span>                     
                    </Form.Group>
                  </Col>
                  
                </Row>
                <Row>
                  <Col lg='6' sm='12'>
                    <Form.Group className="mb-2" controlId="Password">
                      <Form.Label className="mb-4 label">Password</Form.Label>
                      <div className="input-group" style={{ position: 'relative' }}>
                      <Form.Control type={showPassword ? "text" : "password"} name="password" className='shadow input-login-signup' style={{ borderRadius: '1rem', backgroundColor: 'transparent', color: 'black' }} value={formData.password} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} onChange={handlePasswordChange} required />
                        {
                          <span className="material-symbols-outlined mt-2" style={{color: '#000000', cursor:'pointer', marginLeft:'-30px', marginRight:'0px', fontSize:'2rem', zIndex:'1000'}} onClick={togglePasswordVisibility}>{showPassword ? "visibility_lock" : "visibility" }</span>
                        }
                      </div>
                    </Form.Group>
                        {/* Password tip */}
                    {passwordFocused && (   
                        <div className='passValid'>
                          <ul>
                            <strong>Password must contain:</strong>
                            <li style={{listStyleType:'none', paddingLeft:'0px', color: passwordValidity.hasLowercase ? 'green' : 'red' }}>
                              <i className={passwordValidity.hasLowercase ? 'fas fa-check-circle' : 'fas fa-times-circle'}></i>
                              {' '} At least one lowercase letter
                            </li>
                            <li style={{listStyleType:'none', paddingLeft:'0px', color: passwordValidity.hasUppercase ? 'green' : 'red' }}>
                              <i className={passwordValidity.hasUppercase ? 'fas fa-check-circle' : 'fas fa-times-circle'}></i>
                              {' '}At least one uppercase letter
                            </li>
                            <li style={{listStyleType:'none', paddingLeft:'0px', color: passwordValidity.hasNumber ? 'green' : 'red' }}>
                              <i className={passwordValidity.hasNumber ? 'fas fa-check-circle' : 'fas fa-times-circle'}></i>
                              {' '}At least one number
                            </li>
                            <li style={{listStyleType:'none', paddingLeft:'0px', color: passwordValidity.hasSpecialChar ? 'green' : 'red' }}>
                              <i className={passwordValidity.hasSpecialChar ? 'fas fa-check-circle' : 'fas fa-times-circle'}></i>
                              {' '}At least one special character
                            </li>
                            <li style={{listStyleType:'none', paddingLeft:'0px', color: passwordValidity.isAtLeast8Chars ? 'green' : 'red' }}>
                              <i className={passwordValidity.isAtLeast8Chars ? 'fas fa-check-circle' : 'fas fa-times-circle'}></i>
                              {' '}At least 8 characters
                            </li>
                          </ul>
                        </div>
                    )}
                    
                  </Col>
                  <Col lg='6' sm='12'>
                    <Form.Group className="mb-2" controlId="rePassword">
                      <Form.Label className="mb-4 label">Repeat Password</Form.Label>
                      <div className="input-group">
                        <Form.Control type={showRePassword ? "text" : "password"} name="repassword" className=' shadow input-login-signup' style={{borderRadius:'1rem', backgroundColor:'transparent', color:'black'}} value={formData.repassword} onKeyUp={machPassword} onChange={handleChange} required />                        
                        {
                          <span className="material-symbols-outlined mt-2" style={{color: '#000000', cursor:'pointer', marginLeft:'-30px', marginRight:'0px', fontSize:'2rem', zIndex:'1000'}} onClick={toggleRePasswordVisibility}>{showRePassword ? "visibility_lock" : "visibility" }</span>
                        }
                      </div>
                      <span id='pMatched' style={{fontSize:'0.8rem'}} hidden></span>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg='6' sm='12'>
                    <Form.Group className="mb-2" controlId="Captcha">
                      <Form.Label className="mb-4 label">Captcha</Form.Label>
                      <Form.Control type="text" name="captcha" className=' shadow input-login-signup' style={{borderRadius:'1rem', backgroundColor:'transparent', color:'black'}} value={formData.captcha} onChange={handleCaptchaChange} required />
                    </Form.Group>
                  </Col>
                  {captcha.data && (
                    <>
                      <Col lg='4' sm='8' className='captchaImg' dangerouslySetInnerHTML={{ __html: captcha.data }}></Col>
                      <Col lg='2' sm='4' className='captchaImg'>
                        <i className="fa-solid fa-arrow-rotate-right" style={{fontSize:'2rem', cursor:'pointer', transform: 'translate(-5px, 15px)' }} onClick={reloadCaptcha}></i>
                      </Col>
                    </>
                  )}
                </Row>
                <div className="" style={{textAlign:'left', display:'flex'}}>
                  <input className="form-check-input shadow" type="checkbox" value="" id="flexCheckDefault" style={{}} required />
                  <span style={{ transform: 'translateY(0%)', textAlign:'right !important', justifyContent: 'right !important' }}>
                    &nbsp;By registering you agree to our 
                    <Link style={{ textDecorationLine: 'none',fontSize: '1.2rem', color: 'orange', textAlign:'right', transform:'translateY(-72%)' }} to={"/privacy"} target="_blank" >
                      &nbsp;Privacy Policy
                    </Link>
                  </span>
                </div>
                {
                  <Button variant={cons ? "success":"danger"} id='signupButton' className='mb-4' type="submit">
                    Signup
                  </Button>
                }
                <Form.Group className="mb-4" controlId="login">
                  <Form.Text style={{color:'black'}} className=''>
                    Already have an account? <Link to={'/login'} style={{fontSize:'1.2rem', textDecorationLine:'none', color:'yellowgreen'}}>Login Now</Link>
                  </Form.Text>
                </Form.Group>
              </Form>              
          </Card.Body>
        </Card>
        </div>
        </div>
      </div>
    </>
  )
}

export default Signup
