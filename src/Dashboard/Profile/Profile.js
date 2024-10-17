import React, {useEffect, useState} from 'react'
import { useNavigate } from'react-router-dom';
import { Button, Card, Col, Container, Row, Table  } from "react-bootstrap";
import Swal from "sweetalert2";
import apiService from '../../apiService';

function Profile() {
    let apiurl =''
    if(process.env.REACT_APP_SERVER_STATE === 'development'){
        apiurl = process.env.REACT_APP_API_URL;
    }else{
        apiurl = process.env.REACT_APP_PROD_API;
    }
    const [companyData, setCompanyData] = useState();
    const navigate = useNavigate();

    const handleUCompany = async () =>{
        navigate("/dashboard/companydetails");
    }
    
    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        const uuid = localStorage.getItem("uuid");
        if (loggedIn === "false" || loggedIn === null || !loggedIn) {
            Swal.fire({
              title: "Login Required",
              text: "You need to get logged in first! Please login to continue",
              icon: "error",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
            document.getElementById("swal2-checkbox").style.display = "none";
        }else{
            try {
                apiService.post(`${apiurl}/api/v1/dash/company/fetch`, {uuid: uuid})
                .then((respo) => {
                    if(respo.data.message === "Company Found"){
                        setCompanyData(respo.data.result);
                        document.getElementById('cName').innerText = respo.data.result[0].company_name
                        document.getElementById('cLocation').innerText = respo.data.result[0].address
                        document.getElementById('cContact').innerText = respo.data.result[0].contact_number
                        document.getElementById('cEmail').innerText = respo.data.result[0].company_email
                        document.getElementById('cWeb').innerHTML = `<a style="font-size:14px !important; padding: 0px !important;" href = ${respo.data.result[0].company_website} target="_blank">${respo.data.result[0].company_website}</a>`
                    }else{
                        setCompanyData(null);
                    }
                })
            } catch (error) {
                
            }
        }
    }, [apiurl, navigate])
  return (
    <>
                <Container style={{alignItems:'center', justifyContent:'center', alignContent:'center'}}>
                    <Row>
                        <Col>
                            <Card style={{marginTop:'10px', marginBottom:'10px', width:'30rem', border:'none'}}>
                                <Card.Title style={{color:'goldenrod'}}>Personal Details</Card.Title>                    
                                <Table responsive size='sm'>
                                    <tbody>
                                        <tr>
                                            <td><b>Name</b></td>
                                            <td>{localStorage.getItem("user")}</td>
                                        </tr>
                                        <tr>
                                            <td><b>User Name</b></td>
                                            <td>{localStorage.getItem("uName")}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Mobile</b></td>
                                            <td>{localStorage.getItem("mobile")}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Email</b></td>
                                            <td>{localStorage.getItem("email")}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{marginTop:'10px', marginBottom:'10px', width:'30rem', border:'none'}}>
                                <Card.Title style={{color:'goldenrod'}}>Organization Details</Card.Title>                    
                                <Table responsive size='sm'>
                                    <tbody>
                                        <tr>
                                            <td><b>Company Name</b></td>
                                            <td id='cName'></td>
                                        </tr>
                                        <tr>
                                            <td><b>Company Location</b></td>
                                            <td id='cLocation'></td>
                                        </tr>
                                        <tr>
                                            <td><b>Contact Number</b></td>
                                            <td id='cContact'></td>
                                        </tr>
                                        <tr>
                                            <td><b>Company Email</b></td>
                                            <td id='cEmail'></td>
                                        </tr>
                                        <tr>
                                            <td><b>Company Website</b></td>
                                            <td id='cWeb'></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                {!companyData && (
                                    <Button style={{marginTop:'10px'}} onClick={() => handleUCompany(apiurl)}>Update Company Details</Button>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Container>
    </>
  )
}

export default Profile
