import React, {useState} from "react";
import { Col, Form } from "react-bootstrap";
import './Pricing.css'
import { Link } from "react-router-dom";

function Pricing() {
    const [isChecked, setIsChecked] = useState(true);

    const handleSwitchChange = () => {
        setIsChecked(!isChecked);
    };

  return (
    <>
      <section className="pricing" id="pricing">
        <div className="container">
        <div className="headH2">WhatsApp API Pricing</div>
        <div className="row" id="billing">
            <Col className="mon" sm={5}>
                <span id='bTypeText'>Billed Monthly</span>
            </Col>
            <Col className="sw" sm={2}>
                <Form.Check type="switch" id="bType" className="mx-3 input-company" checked={isChecked} onChange={handleSwitchChange} />
            </Col>
            <Col className="ann" sm={5}>
                <span id='bTypeText'>Billed Annually</span>
            </Col>
        </div>
        <br />
        <div className="row">
        <div className="col">
          <div className="card mb-4" style={{boxShadow: "0 6px 28px 0 rgba(24,52,117,.2)", position: "relative"}}>
            <div style={{backgroundColor: "#000", color: "white", padding: "20px"}} className="card-header">
              <div style={{fontSize:'20px', display: "flex", alignItems: "center", fontWeight: "800"}} className="mb-0">
                <i style={{ fontSize: "20px", fontWeight: "800" }} className="fas fa-code mr-2"></i>&nbsp;
                DEVELOPER PLAN
              </div>
            </div>
            <div className="card-body" style={{ backgroundColor: "#F8F9FA" }}>
              <div className="card-title pricing-card-title" style={{fontSize:'30px', fontWeight:600}}>
                <i className='fa-solid fa-indian-rupee-sign'></i><span id="basePrice">{!isChecked ? 2500 : 2100}</span>{" "}
                <small className="text-muted">per phone / month</small>
              </div>
              <p>For Professional Use And Scalable Solutions:</p>
              <hr style={{ marginTop: "2rem!important" }} className="hr-price" />
              <ul className="list-unstyled mt-3 mb-4" style={{fontSize:'1.2rem'}}>
                <li className="mb-2">
                  <i className="fas fa-check mr-2"></i>
                   Unlimited Message Sending &amp; Receiving, including media
                </li>
                <li className="mb-2">
                  <i className="fas fa-check mr-2"></i>
                  Unlimited API Access
                </li>
                <li className="mb-2">
                  <i className="fas fa-check mr-2"></i>
                  Unlimited Messaging With No Extra Fees
                </li>
                <li className="mb-2">
                  <i className="fas fa-check mr-2"></i>
                  Advanced Integration Options <br /> 
                  {/* (e.g., Google Sheets and Contacts, Make ) */}
                </li>
                <li className="mb-2" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <i className="fas fa-check mr-2"></i>
                   Ticket Support
                </li>
                <li className="mb-2" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <i className="fas fa-check mr-2"></i>
                   Email Support
                </li>
                <li className="mb-2" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <i className="fas fa-check mr-2"></i>
                   WhatsApp Support
                </li>
              </ul>
              <p className="small">
                <i className="fa-solid fa-hand-point-right fa-beat-fade fa-2xl" style={{color:'#700567', padding: "8px"}}></i>
                Note: Pricing is for a single number. For 6 or more numbers,
                please contact <a href="mailto:sales@vortexapis.com" style={{color:'blueviolet'}}>sales@vortexapis.com</a> for discounted rates.
              </p>
              <Link to="/signup" className="sandbox_plan_a" aria-label="maytapi-console" target="_blank">
                <button style={{ backgroundColor: "#3bb3b4", color: "white" }} type="button" className="btn btn-lg btn-block" id="actionButton">
                  Start Free Trial
                </button>
              </Link>
              <span style={{display: "flex", alignItems: "center", justifyContent: "center", fontSize: "smaller", marginTop: "4px"}}>
                <i className="fa-solid fa-hand-point-right fa-2xl" style={{color:'green', padding: "8px"}}></i>
                  No Credit Card Required
                  <i className="fa-solid fa-hand-point-left fa-2xl" style={{color:'green', padding: "8px"}}></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <div className="end-cap ecap"></div>
    </>
  );
}

export default Pricing;
