import React from 'react'
import {Row, Col} from 'react-bootstrap'
import '../Features/Features.css'
import { Link } from 'react-router-dom'

function GettingStarted() {
  return (
    <>
        <section className="features" id="gettinStarted">
            <div className="container">
                <div className='headH2'>Getting Started</div>
                <h3 style={{}}>Follow these 4 steps to begin using the WhatsApp API with Vortex.</h3>
                <Row className="features-list">
                    <Row>
                        <Col className="feature-item" xs={12} sm={12} md={6} lg={3}>
                            <h3 id='steps'><span>1</span></h3>
                            <h4>Sign Up</h4>
                            <p>Sign Up into the portal by visiting <Link to='/signup' style={{color:'blue !important'}}>Sign Up page</Link></p>
                        </Col>
                        <Col className="feature-item" xs={12} sm={12} md={6} lg={3}>
                            <h3 id='steps'><span>2</span></h3>
                            <h4>Fetch QR Code</h4>
                            <p>Fetch QR Code by clicking the 'Fetch Session' button against the token available on the Dashboard.</p>
                        </Col>
                        <Col className="feature-item" xs={12} sm={12} md={6} lg={3}>
                            <h3 id='steps'><span>3</span></h3>
                            <h4>Pair Phone</h4>
                            <p>Scan the QR code on your phone to pair and connect with the Vortex WhatsApp API.</p>
                        </Col>
                        <Col className="feature-item" xs={12} sm={12} md={6} lg={3}>
                            <h3 id='steps'><span>4</span></h3>
                            <h4>Start Sending Messages</h4>
                            <p>Once connected, you can send your first WhatsApp message in your preferred language.</p>
                        </Col>
                    </Row>
                </Row>
            </div>
        </section>
        <div className="end-cap ecap"></div>
    </>
  )
}

export default GettingStarted
