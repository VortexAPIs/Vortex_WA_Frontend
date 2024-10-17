import React, { useState} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap';
import apiService from '../../apiService';
import Swal from 'sweetalert2';

function CreateBroadcast() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile)
    };
    const role = localStorage.getItem('role')

    const createBroadcastHandler = () => {
        const formData = new FormData();
        
        formData.append('file', document.getElementById('file').files[0]);
        formData.append('subject', document.getElementById('sub').value);
        formData.append('description', document.getElementById('des').value);

        try {
            apiService.post('/api/v1/dash/broadcast/create',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((data)=>{
                console.log(data.data.message)
                if(data.data.message === "Data uploaded successfully."){
                    Swal.fire({
                        title: "Broadcast Created",
                        text: "Broadcast Data Saved Successfully and Circulated.",
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                    document.getElementById("swal2-checkbox").style.display = "none";
                }
            })
        } catch (error) {
        console.log('unable to create broadcast')
        }
    }

    return (
        <>
            {(role === 'Admin' || role === 'CRM') ? (
                <Form>
                    <h3>Create New Broadcast</h3>
                    <Row>
                        <Col sm={6} style={{padding:'0 1%'}}>
                            <Form.Group controlId="sub">
                                <Form.Label className="mb-3 lable">Subject</Form.Label>
                                <Form.Control className="shadow input-company" name='sub' type="text" style={{whiteSpace:'wrap', display:'flex', flexDirection:'row'}} />
                            </Form.Group>
                        </Col>
                        <Col sm={6} style={{padding:'0 1%'}}>
                            <Form.Group controlId="file">
                                <Form.Label className="mb-3 lable">Attachement</Form.Label>
                                <Form.Control type="file" className="shadow input-company" name='file' onChange={handleFileChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} style={{padding:'0 1%'}}>
                            <Form.Group controlId="des">
                                <Form.Label className="mb-3 lable">Description</Form.Label>
                                <Form.Control as="textarea" className="shadow input-company" name='des' style={{whiteSpace:'wrap', display:'flex', flexDirection:'row', marginTop:'-3%'}}  />
                            </Form.Group>
                        </Col>
                    </Row>
                    {
                        <Button variant="success" className="mb-4 shadow" style={{marginTop:'3%'}} onClick={createBroadcastHandler} >
                            Create Broadcast
                        </Button>
                    }  
                </Form>
            ):(
                <p> It seems you've landed on an Unauthorized Property.</p>               
            )}
        </>
    )
}

export default CreateBroadcast
