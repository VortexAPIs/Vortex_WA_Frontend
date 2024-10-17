import React from 'react';
import './PrivacyPolicy.css';
import Header from '../Header/Header'
// import { Row } from 'react-bootstrap';
import Footer from '../Footer/Footer';

const PrivacyPolicy = () => {
  // const today = new Date().toLocaleDateString();

  return (
    <>
    <Header />
    <section className='privacy-head' style={{overflowY: 'auto', maxHeight: 'calc(100vh - 65px)', maxWidth:'100vw'}}>
    <div className="container">
      <h1 className="privacy-title">Vortex Privacy Policy</h1>
      <p className="last-revised">Last Revised: 23-Aug-2024</p>

      <section className="privacy-section">
        <h2>Collection of Information</h2>

        <h3 style={{marginLeft:'30px'}}>Information You Provide to Us</h3>
        <p style={{marginLeft:'30px'}}>
          We collect information you provide directly to us. For example, we collect
          information when you use our services, fill out forms, request customer
          support, or communicate with us. This information may include your name,
          email address, postal address, credit card details, and other identifying
          information.
        </p>

        <h3 style={{marginLeft:'30px'}}>Information We Collect Automatically When You Use the Services</h3>
        <p style={{marginLeft:'30px'}}>
          When you access our services, we automatically gather certain information,
          including:
        </p>
        <ul style={{marginLeft:'30px'}}>
          <li>
            <strong>Log Information:</strong> Data about your use of our services, like browser type,
            access times, pages viewed, IP address, and the referring page.
          </li>
          <li>
            <strong>Device Information:</strong> Details about the device you use, including hardware
            model and operating system version.
          </li>
          <li>
            <strong>Location Information:</strong> We may collect your device's location data when you
            use our mobile applications or consent to this collection.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We use technologies like cookies to
            collect information, enhance your experience, and analyze service usage.
            Web beacons (or "tracking pixels") may also be used to track usage or
            campaign effectiveness.
          </li>
        </ul>

        <h3 style={{marginLeft:'30px'}}>Information We Collect From Other Sources</h3>
        <p style={{marginLeft:'30px'}}>
          We may combine information from other sources (like third-party services
          you've authorized) with information we collect through our services to
          improve service delivery.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Use of Information</h2>
        <p style={{marginLeft:'30px'}}>We use the information we collect to:</p>
        <ul style={{marginLeft:'30px'}}>
          <li>Provide, maintain, and improve our services;</li>
          <li>Process transactions and deliver services you request;</li>
          <li>Send technical notices, updates, security alerts, and support messages;</li>
          <li>Respond to your inquiries and provide customer service;</li>
          <li>Communicate with you about updates, trends, and relevant news;</li>
          <li>Analyze usage and activity trends to improve our services;</li>
          <li>Personalize your experience with our services.</li>
        </ul>
        <p style={{marginLeft:'30px'}}>
          By using our services, you consent to the transfer and processing of your
          information in the United States and other countries.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Sharing of Information</h2>
        <p style={{marginLeft:'30px'}}>We may share your personal information in the following ways:</p>
        <ul style={{marginLeft:'30px'}}>
          <li>
            With third-party vendors and service providers who need access to your
            information to perform services on our behalf;
          </li>
          <li>
            If required by law, regulation, legal process, or governmental request;
          </li>
          <li>
            To enforce our user agreements or policies, including our Terms of Service,
            and to protect Vortex, our users, or the public from harm or illegal activities;
          </li>
          <li>
            In connection with any merger, sale of Vortex assets, financing, or
            acquisition of all or part of our business by another company;
          </li>
          <li>
            As described to you at the time of collection or in our privacy policy.
          </li>
        </ul>
        <p style={{marginLeft:'30px'}}>We may also share aggregated or anonymized data that does not directly identify you.</p>
      </section>

      <section className="privacy-section">
        <h2>Third-Party Analytics</h2>
        <p style={{marginLeft:'30px'}}>
          We may allow third parties to conduct analytics services. These parties may
          use cookies, web beacons, and other technologies to gather data on your
          usage of our services and other websites. This information helps us and
          third parties analyze usage, track content popularity, and understand online
          behavior. Our privacy policy does not cover third-party cookies or tracking
          technologies, and we encourage you to review their privacy policies.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Security</h2>
        <p style={{marginLeft:'30px'}}>
          We implement reasonable measures to protect your personal information from
          loss, theft, misuse, and unauthorized access, disclosure, alteration, or
          destruction.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Your Information Choices</h2>

        <h3 style={{marginLeft:'30px'}}>Location Information</h3>
        <p style={{marginLeft:'30px'}}>
          If you initially consent to our collection of location data, you can stop this
          collection by changing your device settings. Note that this may affect the
          functionality of our mobile applications. You can also remove our
          applications by uninstalling them from your device.
        </p>

        <h3 style={{marginLeft:'30px'}}>Cookies</h3>
        <p style={{marginLeft:'30px'}}>
          Most browsers accept cookies by default. You can set your browser to reject
          cookies, but this may affect the availability and functionality of our services.
        </p>

        <h3 style={{marginLeft:'30px'}}>Promotional Communications</h3>
        <p style={{marginLeft:'30px'}}>
          You can opt out of promotional emails by following the instructions in those
          emails. However, we may still send you non-promotional communications
          related to your account or ongoing business relations.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Contact Us</h2>
        <p style={{marginLeft:'30px'}}>
          If you have questions about this privacy policy, please contact us at: 
          <a href="mailto:support@vortexapis.com">support@vortexapis.com</a>.
        </p>
      </section>
    </div>
    <Footer />
    </section>
    </>
  );
};

export default PrivacyPolicy;
