import React, {useEffect, useState} from 'react'
import MultiSelectDropdown from './MultiSelectDropdown';
import {Form, Row, Col, Button} from 'react-bootstrap';
import apiService from '../../apiService';
import Swal from 'sweetalert2';

function CreateAnnouncement() {
  let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }
  // eslint-disable-next-line
  const [selectedValues, setSelectedValues] = useState([]);
  const [users, setUsers] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const role = localStorage.getItem('role')

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile)
  };

  const handleSelectionChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
  };

  const createAnnounceHandler = () => {
    const formData = new FormData();

    formData.append('file', document.getElementById('file').files[0]);
    formData.append('uuid',document.getElementById('uuid').textContent);
    formData.append('subject',document.getElementById('sub').value);
    formData.append('description',document.getElementById('des').value);

    try {
      apiService.post('/api/v1/dash/announcement/create',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((data)=>{
        console.log(data.data.message)
        if(data.data.message === "Data uploaded successfully."){
          Swal.fire({
            title: "Announcement Created",
            text: "Announcement Data Saved Successfully and Circulated.",
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
      console.log('unable to create announcement')
    }
  }

  useEffect(() => {
    const data = {}
    apiService.get(`${apiUrl}/api/v1/auth/fetchUsers`,data)
    .then((data)=>{
      setUsers(data.data)
    })
  },[apiUrl])

  return (
    <>
        {
            (role === 'Admin' || role === 'CRM') ? (
                <Form>
                    <h3>Create New Announcement</h3>
                    <Row>
                        <Col sm={6} style={{padding:'0 1%'}}>
                            { users ? (
                            <MultiSelectDropdown options={users} label="Announcement is being issued to" onSelectionChange={handleSelectionChange} />
                            ) : (
                            'Loading Users...'
                            )}
                        </Col>
                        <Col sm={6} style={{padding:'0 1%'}}>
                            <Form.Group controlId="sub">
                                <Form.Label className="mb-3 lable">Subject</Form.Label>
                                <Form.Control className="shadow input-company" name='sub' type="text" style={{whiteSpace:'wrap', display:'flex', flexDirection:'row'}} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} style={{padding:'0 1%'}}>
                            <Form.Group controlId="des">
                                <Form.Label className="mb-3 lable">Description</Form.Label>
                                <Form.Control as="textarea" className="shadow input-company" name='des' />
                            </Form.Group>
                        </Col>
                        <Col sm={6} style={{padding:'0 1%'}}>
                            <Form.Group controlId="file">
                                <Form.Label className="mb-3 lable">Attachement</Form.Label>
                                <Form.Control type="file" className="shadow input-company" name='file' onChange={handleFileChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    {
                        <Button variant="success" className="mb-4 shadow" style={{marginTop:'3%'}} onClick={createAnnounceHandler} >
                            Create Announcement
                        </Button>
                    }  
                </Form>
            ) : (
                <div className='content'>
                    <div className="main-content"  style={{backgroundColor:'#fff',overflowY: 'auto', maxHeight: 'calc(100vh - 60px)'}}>
                        <p> It seems you've landed on an Unauthorized Property.</p>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default CreateAnnouncement
