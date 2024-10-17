import React, { useEffect, useState } from 'react';
import apiService from '../../apiService';
import './WhatsAppChecker.css';
import { Col, Form, Row, InputGroup } from 'react-bootstrap';

const WhatsappNumber = () => {
    let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }

    const uuid = localStorage.getItem('uuid')
    const [result, setResult] = useState(null);
    const [options, setOptions] = useState([]);
    const [insID, setInsID] = useState('')
    const [apiKey, setApiKey] = useState('')
    
    const fetchOptions = async () => {
        try {
            apiService.post(`${apiUrl}/api/v1/dash/wa/fetchInstance`, {uuid: uuid})
            .then((data) => {
                if (data.data.message === "Instance Found") {
                    const fetchedOptions = data.data.result.map(instance => ({
                        value: instance.insid,
                        label: instance.instanceName,
                        auth: instance.authenticated,
                        apiKey: instance.api_key
                    }));
                    setOptions(fetchedOptions);
                }
            })
        } catch (error) {
          console.error('Error fetching options:', error);
        }
    };
    
    const handleChange = (e) => {
        setInsID(e.target.value);
        let key =''
        // eslint-disable-next-line
        options.filter(function(r) {
            if(r.value === e.target.value){
                key = r.apiKey
            }
        })
        setApiKey(key)
    };
    
    const handleCheckNumber = (e) => {
        e.preventDefault(); // Preventing form to submit blank values.
        // Placeholder for actual API call logic
        let pNumber = document.getElementById('pNum').value
        
        let data ={}
        const headers = {
            "key": document.getElementById('aKey').value,
        };
        apiService.post(`/api/v1/dash/checknumberstatus?insid=${insID}&number=${pNumber}`,data,{
            headers: headers,
        })
        .then((data) => {
            setResult({
                status: data.data.result,
                message: data.data.message,
                curlCommand: `curl -X POST '${apiUrl}/api/v1/check/checknumberstatus?insid=${insID}&number=${pNumber}@c.us' 
                              -H 'key: ${document.getElementById('aKey').value}' 
                              -H 'Content-Type: application/json' 
                              -H 'Accept: application/json'`
            });
        });
    };

    
    
    useEffect(() =>{
        fetchOptions();
        // eslint-disable-next-line
    },[])

    return (
        <>
            <div className=''>
                <h1 className='toggle'>WhatsApp Number Checker</h1>
                <p>
                    The WhatsApp Number Checker is an intuitive tool that allows you to easily verify whether a phone number is registered on WhatsApp. To use it, just choose one of your active phone numbers, enter the number you wish to check, and click the 'Check Number' button. The tool will swiftly process your request and display the result, which can be utilized for various purposes. This versatile checker offers a straightforward solution for validating WhatsApp numbers.
                </p>
                <Row>
                    <Col sm={6} style={{padding:'10px'}}>
                        <h5 style={{marginLeft:'20px'}}>Input</h5>
                        <Form style={{width:'100%'}}>
                            <Row>
                                <Form.Group controlId="iName">
                                    <Form.Select className="shadow input-company" type="text" name='iName' value={insID} onChange={handleChange} style={{height:'50px'}}>
                                        <option value="" >Select Instance</option>
                                        {options.map((option) => (option.auth === 1 ? (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ):''))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row style={{alignContent:'center',justifyContent:'center',alignItems:'center',justifyItems:'center',display:'flex',flexDirection:'column',}}>
                                <Form.Group controlId="aKey" hidden>
                                    <Form.Control className="shadow input-company" name='aKey' value={apiKey} type="text" readOnly />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Label className="mb-3 lable"></Form.Label>
                                <InputGroup className="shadow input-company mb-3">
                                    <InputGroup.Text id="pNumG">+</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Enter a Phone Number to check along with country code"
                                        aria-label="Mobile Number"
                                        aria-describedby="pNumG"
                                        id='pNum'
                                        style={{height:'50px'}}
                                    />
                                </InputGroup>
                            </Row>
                        </Form>
                        <button className='mb-4 shadow btn btn-success' onClick={handleCheckNumber}>
                            <i className="fas fa-search"></i> Check Number
                        </button>
                    </Col>
                    <Col sm={6} style={{padding:'10px'}}>
                        <h5 style={{marginLeft:'20px'}}>How to use?</h5>
                        <ul>
                            <i className="fa-solid fa-mobile-screen fa-xl" style={{padding:'10px'}}></i> <span style={{fontSize:'18px', padding:'10px'}}>Select one of your active phone numbers from the dropdown.</span><br />
                            <i className="fa-regular fa-keyboard fa-xl" style={{padding:'10px'}}></i><span style={{fontSize:'18px', padding:'10px'}}>Enter the phone number you want to check (including country code).</span><br />
                            <i className="fa-solid fa-hand-pointer fa-xl" style={{padding:'10px'}}></i><span style={{fontSize:'18px', padding:'10px'}}>Click the 'Check Number' button.</span><br />
                            <i className="fa-regular fa-eye fa-xl" style={{ padding:'10px'}}></i><span style={{fontSize:'18px', padding:'10px'}}>View the result in the section below.</span><br />
                        </ul>
                    </Col>
                </Row>
                <div className="input-section">
                </div>
                {result && (
                    <div className="result-section">
                        <div className={result.status === true ? 'success-message' : 'danger-message'}>
                            {result.status === true ? <i className="fas fa-check-circle"></i> : <i className="fa-solid fa-circle-xmark"></i>} 
                            <span id='numResult'>{result.message}</span>
                        </div>
                        <div className="curl-command">
                            <p>You can use the cURL code below to get more details about this phone number:</p>
                            <pre>{result.curlCommand}</pre>
                            <button onClick={() => navigator.clipboard.writeText(result.curlCommand)}>Copy</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default WhatsappNumber;
