import React, { useState, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../Website/Assets/vortex_icon.png';
import Swal from 'sweetalert2';

import { Row, Button, Card, Form, Col } from 'react-bootstrap';
import apiService from '../../apiService';

function ResetPass() {
    const navigate = useNavigate();
    const [cons, setCons] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [passwordFocused, setPasswordFocused] = useState(false);
    const handlePasswordFocus = () => setPasswordFocused(true);
    const handlePasswordBlur = () => setPasswordFocused(false);
    const inputRefs = useRef([]);
    const [formData, setFormData] = useState({ // To handle the Form Data and reseting the Form Data
        password: '',
        repassword:''
    });
    const { token } = useParams();

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

    const handleChangeF = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        if(formData.password.length>=8){
          setCons(true)
        }else{
          setCons(false)
        }
    };

    // Handle change of input field
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return; // Only allow numbers
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to next input if current is filled
        if (element.value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle backspace for moving cursor back
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('otp',otp.join(""))
        formData.append('password',document.getElementById("Password").value)
        formData.append('repassword',document.getElementById("rePassword").value)
        
        if (cons === true) {
            apiService.post(`/api/v1/auth/reset-password/${token}`,formData) //Linking and sending data to backend server's user's database
            .then(response => { // Handling Server Response
                if(response.data.message === "Password reset successful, please login."){
                    Swal.fire({
                        title: "Password Reset Successful",
                        text: response.data.message,
                        icon: "success"
                    });
                    document.getElementById("swal2-checkbox").style.display = "none";
                    navigate("/login") // Navigate to Home page
                    // Reseting the form data to blank
                    setFormData({
                        password: '',
                        repassword: ''
                    });
                }else if(response.data.title === "Invalid OTP/Token"){
                    Swal.fire({
                        title: response.data.title,
                        text: response.data.message,
                        icon: "error"
                    }).then((result) =>{
                        navigate('/forget')
                    });
                    document.getElementById("swal2-checkbox").style.display = "none";
                }else{
                    Swal.fire({
                        title: "Invalid Credentials",
                        text: response.data.message,
                        icon: "error"
                    });
                    document.getElementById("swal2-checkbox").style.display = "none";
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong, please try again.",
                    icon: "error"
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

    const machPassword= (e) => {
        const {name, value} = e.target
        const pass = formData.password;
        // console.log(pass)
        if(pass === value && name === "repassword"){
          const passSpan = document.getElementById("pMatched")
          passSpan.hidden = false;
          passSpan.textContent = "Password matched";
          passSpan.style.color = 'green';
        }else{
          const passSpan = document.getElementById("pMatched")
          passSpan.hidden = false;
          passSpan.textContent = "Password not matched";
          passSpan.style.color ='red';
        }
    }
    
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
        <div className="fPass-div flex">
            <Card style={{  }} className='fPass-card'>
                <img variant="top" alt='icon' src={Icon} className='login-img' style={{}} />
                <Card.Body>
                    <h2 style={{transform:'translateY(-55%)'}}>Reset Password!</h2>
                </Card.Body>
                <Form onSubmit={handleSubmit} style={{transform:'translateY(-10%)'}}>
                    <Row className='otp-container'>
                        <Form.Label className="mb-4 label">Enter OTP sent on your WhatsApp number</Form.Label>
                        <div className="otp-inputs">
                            {otp.map((data, index) => (
                                <input key={index} type="text" maxLength="1" value={data} onChange={e => handleChange(e.target, index)} onKeyDown={e => handleKeyDown(e, index)} ref={el => (inputRefs.current[index] = el)} className="otp-input" />
                            ))}
                        </div>
                    </Row>
                    <Row>
                        <Col lg='12' sm='12' className='p-3'>
                            <Form.Group className="" controlId="Password">
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
                                <strong>Password must contain:</strong>
                                <ul>
                                    <li style={{ color: passwordValidity.hasLowercase ? 'green' : 'red' }}>
                                    At least one lowercase letter
                                    </li>
                                    <li style={{ color: passwordValidity.hasUppercase ? 'green' : 'red' }}>
                                    At least one uppercase letter
                                    </li>
                                    <li style={{ color: passwordValidity.hasNumber ? 'green' : 'red' }}>
                                    At least one number
                                    </li>
                                    <li style={{ color: passwordValidity.hasSpecialChar ? 'green' : 'red' }}>
                                    At least one special character
                                    </li>
                                    <li style={{ color: passwordValidity.isAtLeast8Chars ? 'green' : 'red' }}>
                                    At least 8 characters
                                    </li>
                                </ul>
                                </div>
                            )}
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='12' sm='12' className='p-3'>
                            <Form.Group className="" controlId="rePassword">
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
                    {
                        <Button variant={cons ? "success":"danger"} className='mb-4' type="submit">
                            Change Password
                        </Button>
                    }
                </Form>
            </Card>
        </div>
    </>
  )
}

export default ResetPass
