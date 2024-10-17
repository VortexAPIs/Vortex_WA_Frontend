import React from 'react';
import './Hero.css';
import heroImage from '../../Assets/vortexBannerImg.png';
import { Col, Container, Row } from 'react-bootstrap';

const Hero = () => {
  return (
    <>
      <Row className='tRow' id='hero'>
        <div className='head' style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>
          <h1>Unofficial WhatsApp API For Developers</h1>
          <h2 style={{color:'#ff6600'}}>(Multi-Device Supported API)</h2>
        </div>
        <section className='row1'>
          <Container>
            <Row>
              <Col xs={12} sm={12} md={12} lg={7}>
                <p style={{paddingTop:'60px'}}>
                  Effortlessly manage WhatsApp messaging with our powerful API— <br />
                  Send, Receive, and Track Messages With Ease. <br /><br />
                  Seamlessly Control WhatsApp Groups, Channels, and Statuses Using Simple HTTP Requests.
                </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={5}>
                <img src={heroImage} alt='basic' height={'300px'} width={'600px'}></img>
              </Col>
            </Row>
          </Container>
        </section>
      </Row>
      <div className="end-cap ecap"></div>
    </>
  );
};

export default Hero;
