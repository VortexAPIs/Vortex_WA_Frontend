import React from 'react';
import './Features.css';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Features = () => {
  return (
    <>
    <section className="features" id="features">
      <div className="container">
        <div className='headH2'>Key Features You'll get With Our WhatsApp API</div>
        <Row className="features-list">
          <Row>
            <Col className="feature-item" xs={12} sm={12} md={6} lg={6}>
              <h3>Stable API</h3>
              <p>With multi-device WhatsApp, Vortex now offers improved uptime at 99.98%, ensuring more reliable performance than ever before.</p>
            </Col>
            <Col className="feature-item" xs={12} sm={12} md={6} lg={6}>
              <h3>Comprehensive JSON API</h3>
              <p>Connect any preferred programming language to the WhatsApp API using our JSON API. Detailed documentation and examples can be found at <Link to='/dashboard/apiDocs'>Vortex Whatsapp API documentation.</Link></p>
            </Col>
          </Row>
          <Row>
            <Col className="feature-item" xs={12} sm={12} md={6} lg={6}>
              <h3>Enhanced Message Type</h3>
              <p>All message types—including text, location, contact, images, audio, videos, documents, and archives—are fully supported.</p>
            </Col>
            <Col className="feature-item" xs={12} sm={12} md={6} lg={6}>
              <h3>Webhook</h3>
              <p>Custom HTTP callbacks are triggered when a message is received or when the delivery status changes.</p>
            </Col>
          </Row>
          <Row>
            <Col className="feature-item" xs={12} sm={12} md={6} lg={6}>
              <h3>Group Management</h3>
              <p>You have complete control over the WhatsApp Group API, enabling you to create groups, add or remove participants, and send or receive messages.</p>
            </Col>
            <Col className="feature-item" xs={12} sm={12} md={6} lg={6}>
              <h3>Channels</h3>
              <p>Vortex allows you to share updates, send messages, and connect directly with your followers through the WhatsApp API. You can also now customize your channel by adding a description and icon via the API.</p>
            </Col>
          </Row>
          <Row>
            <h4>
              Over the past 2 years, we have assisted more than 20 business owners and developers like you in building successful businesses.
            </h4>
          </Row>
        </Row>
      </div>
    </section>
    <div className="end-cap ecap"></div>
    </>
  );
};

export default Features;
