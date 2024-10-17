import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from'react-router-dom';
import { Row, Container, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import socket from '../../socketManager';
import apiService from '../../apiService';

function CreateTicket() {

    const [instances, setInstances] = useState([]);
    const [issType, setIssType] = useState('');
    const location = useLocation();
    const [insID, setInsID] = useState(null);

    const navigate = useNavigate()
    const handleInsChange = (e) => {
        setInsID(e.target.value);
        
    };

    const handleChange = (e) => {
        // setInputValue(e.target.value);
    };
    
    const handleTypeChange = (e) => {
        setIssType(e.target.value);
        console.log(e.target.value)
        if(e.target.value === "Create New Instance" || e.target.value === "Fetch Instances") {
            document.getElementById("rInsid").setAttribute('hidden','hidden')
            document.getElementById('rInteg').setAttribute('hidden','hidden')
        }else if(e.target.value === "Integration Related"){
            document.getElementById('rInteg').removeAttribute('hidden')
        }else{
            document.getElementById("rInsid").removeAttribute('hidden')
            document.getElementById('rInteg').setAttribute('hidden','hidden')
        }
    };

    useEffect(() =>{
        const url = location.href || window.location.href;
        const urlParams = new URLSearchParams(new URL(url).search);

        if(urlParams){
            setIssType(urlParams.get('type'))
            if(urlParams.get('type') === "Create New Instance" || urlParams.get('type') === "Fetch Instances") {
                document.getElementById("rInsid").setAttribute('hidden','hidden')
            }else{
                document.getElementById("rInsid").removeAttribute('hidden')
            }
        }
        socket.emit("fetchInstance",{uuid: localStorage.getItem("uuid")})
    },[location.href])
    const handleInstances = (data) => {
        const res = data.result.filter(function(r){ return r})
        setInstances(res)
    }

    const createTicketHandler = () => {
        const data = {
            uuid : localStorage.getItem('uuid'),
            insid: document.getElementById('insid').value,
            type: issType,
            subject: document.getElementById('sub').value,
            issue: document.getElementById('issue').value
        }
        apiService.post('/api/v1/dash/ticket/create',data)
        .then((data) => {
            if(data.data.message === 'Ticket Created'){
                Swal.fire({
                    title: data.data.message,
                    text: "We Have Received Your Request and Will Process it Shortly.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/dashboard/viewTickets");
                    }
                });
                document.getElementById("swal2-checkbox").style.display = "none";
            }else{
                Swal.fire({
                    title: data.data.message,
                    text: "Unable to Get Your Request. Please TryAgain Later.",
                    icon: "error",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/dashboard/createTicket");
                    }
                });
                document.getElementById("swal2-checkbox").style.display = "none";
            }
        })
    }
    socket.on("instanceFetched",handleInstances)
  return (
    <> 
        <Container style={{alignItems:'center', justifyContent:'center', alignContent:'center'}}> 
            <h2 style={{textAlign:'center'}}>Create New Ticket</h2>                   
            <Form style={{marginLeft:'25%', width:'50%'}}>
                <Row>
                    <Form.Group controlId="iName">
                        <Form.Label className="mb-3 lable">Select Issue Type</Form.Label>
                        <Form.Select className="shadow input-company" type="text" name='iName' value={issType} onChange={handleTypeChange}>
                            <option value="" disabled>Select Issue Type</option>
                            <option value="Create New Instance">Create New Instance</option>
                            <option value="Fetch Instances">Fetch Instances</option>
                            <option value="Billing Related">Billing Related</option>
                            <option value="Documentation Related">Documentation Related</option>
                            <option value="Integration Related">Integration Related</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row style={{alignContent:'center',justifyContent:'center',alignItems:'center',justifyItems:'center',display:'flex',flexDirection:'column',}}>
                    <Form.Group controlId="uuid" hidden>
                        <Form.Label className="mb-3 lable">UUID</Form.Label>
                        <Form.Control className="shadow input-company" name='uuid' value={localStorage.getItem('uuid')} type="text" readOnly />
                    </Form.Group>
                </Row>
                <Row id='rInsid'>
                    <Form.Group controlId="insid">
                        <Form.Label className="mb-3 lable">Select Token</Form.Label>
                        <Form.Select className="shadow input-company" type="text" name='insid' value={!insID ? '' : insID} onChange={handleInsChange}>
                            <option value="" disabled>Select Token For Which You Want to Raise Ticket</option>
                            {instances.map((option) => (
                                <option key={option.insid} value={option.insid}>
                                    {option.instanceName + " - " + option.insid } 
                                </option>
                                )
                            )}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row id='rInteg'>
                    <Form.Group controlId='intType' readOnly>
                        <Form.Label className='mb-3 lable'>Select Platform</Form.Label>
                        <Form.Select className='shadow input-company' type='text' name='rInteg' value='Google Sheet' readOnly>
                            <option key={0} defaultValue='Google Sheet'>Google Sheet</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId='sub'>
                        <Form.Label className="mb-3 lable">Subject/Summary of Issue</Form.Label>
                        <Form.Control className="shadow input-company" name='sub' type="text" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId='issue'>
                        <Form.Label className="mb-3 lable">Describe The Issue</Form.Label>
                        <Form.Control className="shadow input-company" as="textarea" name='issue' rows={10} />
                    </Form.Group>
                </Row>
                {
                    <Button variant="success" className="mb-4 shadow" style={{marginTop:'5%'}} onClick={createTicketHandler} >
                        Create Ticket
                    </Button>
                }   
            </Form>
        </Container>           
    </>
  )
}

export default CreateTicket
