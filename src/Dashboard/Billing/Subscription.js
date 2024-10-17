/* global Razorpay */
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from'react-router-dom';
import { Button, Container, Row, Form, Table, Alert  } from "react-bootstrap";
import {format} from 'date-fns';
// import '../dashboard/style.css';
import socket from '../../socketManager';
import Swal from "sweetalert2";
import logo from '../../Website/Assets/vortex_final_logo.png'
import apiService from '../../apiService';

function Subscription() {
    let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }
    const [options, setOptions] = useState([]);
    const [insID, setInsID] = useState(null);
    const location = useLocation();
    const uuid = localStorage.getItem('uuid')
    const [isChecked, setIsChecked] = useState(true);
    const [paymentDetails, setPaymentDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [inactiveToken, setInactiveToken] = useState(0);

    const handleSwitchChange = () => {
        setIsChecked(!isChecked);
    };

    function copy(text) {
        navigator.clipboard.writeText(text)
          .then(() => {
            Swal.fire({
               title: "Copied to Clipboard",
               text: "Your Key has been copied to clipboard",
               icon: "success",
               confirmButtonText: "OK",
               confirmButtonColor: "#157347",
             });
             document.getElementById("swal2-checkbox").style.display = "none";
          })
          .catch((err) => console.error("Error copying to clipboard:", err));
      }
    let payableAmount = 0
    if(!isChecked){
        payableAmount = 2500
    }else{
        payableAmount = 2100*12
    }

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInsID(e.target.value);
        
    };

    const paymentHandler = async (e) => {
        const amountDoller = document.getElementById("tAmount").value;
        var amountINR = amountDoller * 100;
        console.log(amountINR);
        const currency = "INR";
        
        var duration = 0;
        if(!isChecked){
            duration = 30;
        }else{
            duration = 365;
        }
        const receiptID = Math.floor(Math.random() * 1000000000).toString();
        const response = await fetch(`${apiUrl}/api/v1/dash/payment/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                insid: insID,
                amount: amountINR,
                currency: currency,
                receipt: receiptID,
                validity: duration,
               
            })
        });
        const data = await response.json();
        console.log(data.result.id);

        var option = {
            key: process.env.REACT_APP_RZP_KEY,
            amount: amountINR,
            currency: currency,
            name: 'Vortex WhatsApp API',
            description: 'Vortex WhatsApp API',
            image: logo,
            order_Id: data.id,
            handler: async function (response) {
                const body = {...response,razorpay_order_id: data.result.id, insid: insID, validity: duration, uuid: uuid}
                const validateResponse = await fetch(`${apiUrl}/api/v1/dash/payment/validate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                });

                const validateData = await validateResponse.json();
                if(validateData.message === "Payment verified"){
                    Swal.fire({
                        title: validateData.message,
                        text: "Payment Successful",
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/dashboard");
                        }
                    });
                    document.getElementById("swal2-checkbox").style.display = "none";
                }else{
                    Swal.fire({
                        title: validateData.message,
                        text: "Payment Failed",
                        icon: "error",
                        confirmButtonText: "OK",
                    })
                    document.getElementById("swal2-checkbox").style.display = "none";
                }
            },
            prefill: {
                name: localStorage.getItem("user"),
                email: localStorage.getItem("email"),
                contact: localStorage.getItem("mobile"),
            },
            notes: {
                address: 'Vortex WhatsApp API',
            },
            theme: {
                color: '#000',
            },
        }
        var rzp1 = new Razorpay(option);
        rzp1.on('payment.success', function (response) {
            console.log(response);
        })
        rzp1.on('payment.failed', function (response) {
            alert('Payment Failed');
        })
        rzp1.open();
        e.preventDefault();
    }

    useEffect(() =>{
        socket.emit('fetchPayments', {uuid: localStorage.getItem("uuid")})
        const uuid = localStorage.getItem("uuid")
        // socket.emit("fetchInstance", { uuid });
        const fetchOptions = async () => {
            try {
                apiService.post(`${apiUrl}/api/v1/dash/wa/fetchInstance`, {uuid: uuid})
                .then((data) => {
                    if (data.data.message === "Instance Found") {
                        const fetchedOptions = data.data.result.map(instance => ({
                            value: instance.insid,
                            label: instance.instanceName,
                            status: instance.status
                        }));
                        setOptions(fetchedOptions);
                        setInactiveToken(data.data.result.filter(function(r){
                            return r.status !== 'Active'
                        }).length)
                    }
                })
            } catch (error) {
              console.error('Error fetching options:', error);
            }
          };
      
          fetchOptions();

            const url = location.href || window.location.href;
            const urlParams = new URLSearchParams(new URL(url).search);
            setInsID(urlParams.get('insid'));

    },[location, apiUrl, inactiveToken])

    const handlePaymentsFetched = (respo) => {
        if (respo.title === "Payment Details Fetched") {
            setPaymentDetails(respo.result);
            setIsLoading(false);
            
          }
    }
    socket.on('PaymentsFetched',handlePaymentsFetched)
    
    return(
    <>
       
                <Container style={{alignItems:'center', justifyContent:'center', alignContent:'center',textAlign:'center'}}> 
                    <h2>Activate Your Token</h2>                   
                    <Form style={{marginLeft:'25%', width:'50%'}}>
                        <Row>
                            <Form.Group controlId="iName">
                                <Form.Label className="mb-3 lable">Instance Name</Form.Label>
                                <Form.Select className="shadow input-company" type="text" name='iName' value={!insID ? '' : insID} onChange={handleChange}>
                                    {inactiveToken !== 0 ? <option value="Instance Not Selected">Select Token</option> : <option value="All Tokens Are Active">All Tokens Are Active</option>}
                                    {options.map((option) => (option.status !== 'Active' ? (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ) : '' ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row style={{alignContent:'center',justifyContent:'center',alignItems:'center',justifyItems:'center',display:'flex',flexDirection:'column',}}>
                            <Form.Group controlId="bTypes">
                                <Form.Label className="mb-3 lable">Billed</Form.Label>
                            </Form.Group>
                            <div className="d-flex align-items-center">
                                <span id='bTypeText' style={{color: 'green', fontSize:'1.2rem', marginLeft:'27.5%' }}>Monthly</span>
                                <Form.Check type="switch" id="bType"
                                    className="mx-3 input-company"
                                    checked={isChecked}
                                    onChange={handleSwitchChange}
                                    style={{alignSelf:'center', alignContent:'center', fontSize:'2rem'}}
                                />
                                <span id='bTypeText' style={{color: 'green', fontSize:'1.2rem', marginLeft:'0%' }}>Annually</span>
                            </div>
                        </Row>
                        <Row>
                            <h6 style={{color:'green',fontSize:'1.2rem',marginLeft:'0%'}}>@ {!isChecked ? (<><i className='fa-solid fa-indian-rupee-sign'></i>2500/Month </>) : (<><i className='fa-solid fa-indian-rupee-sign'></i>2100/Month </>)} </h6>
                        </Row>
                        <Row>
                            {!isChecked ? (
                                <Alert variant="danger">
                                <Alert.Heading>Oh snap! You gonna lose an offer!</Alert.Heading>
                                <p>
                                  You'll lose an offer to save <i className='fa-solid fa-indian-rupee-sign'></i>400 per month.<br />
                                  Do you realy want to lose <i className='fa-solid fa-indian-rupee-sign'></i>4800 right now?
                                </p>
                              </Alert>
                            ) : (
                                <Alert variant="success">
                                    <Alert.Heading>Nice, you got an offer.</Alert.Heading>
                                    <p>
                                        Nice selection, you're going to save <i className='fa-solid fa-indian-rupee-sign'></i>400 per month.<br />
                                        You'll be saving <i className='fa-solid fa-indian-rupee-sign'></i>4800 per year.
                                    </p>
                                    {/* <hr />
                                    <p className="mb-0">
                                        Whenever you need to, be sure to use margin utilities to keep things
                                        nice and tidy.
                                    </p> */}
                                </Alert>
                            )}
                        </Row>
                        <input id='tAmount' value={!isChecked ? 2500 : 2100*12} style={{display:'none'}}/>
                        {
                            <Button variant="success" className="mb-4 shadow" style={{marginTop:'5%'}} onClick={paymentHandler} >
                                {!isChecked ? (
                                    <>
                                        Pay <i className='fa-solid fa-indian-rupee-sign'></i>{payableAmount}
                                    </>
                                ) : (
                                    <>
                                        Pay <i className='fa-solid fa-indian-rupee-sign'></i>{payableAmount}
                                    </>
                                )}
                            </Button>
                        }   
                    </Form>
                </Container>
                <hr />
                <div><h3 style={{color:'rgb(224, 100, 9)'}}>Previous Payment Details</h3></div>
                <Table responsive striped bordered hover style={{ verticalAlign: "middle", textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Token Name</th>
                            <th>Payment ID</th>
                            <th>Order ID</th>
                            <th>Amount</th>
                            <th>Paid On</th>
                            <th>Payment Method</th>
                            <th>Transaction ID</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="9">Loading Payments...</td>
                        </tr>
                    ) : (
                        paymentDetails.map((pay, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{pay.instanceName}</td>
                                <td>{pay.paymentID} <i className="fa-regular fa-copy" style={{marginLeft:'20px', cursor:'pointer'}} onClick={() => copy(pay.paymentID)}></i></td>
                                <td>{pay.orderID} <i className="fa-regular fa-copy" style={{marginLeft:'20px', cursor:'pointer'}} onClick={() => copy(pay.orderID)}></i></td>
                                <td>{pay.amount} {pay.currency}</td>
                                <td>{format(pay.created_at, "dd-MMM-yyyy HH:mm:ss")}</td>
                                <td>{pay.method}</td>
                                <td>{pay.transaction_id} <i className="fa-regular fa-copy" style={{marginLeft:'20px', cursor:'pointer'}} onClick={() => copy(pay.transaction_id)}></i></td>
                                <td>
                                    {pay.status === 'authorized' ? "Payment Success" : "Payment Failed"}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            
    </>
    )
}

export default Subscription;