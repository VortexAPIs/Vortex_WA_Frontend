import React from 'react';
import './Terms.css';
import Header from '../Header/Header'
// import { Row } from 'react-bootstrap';
import Footer from '../Footer/Footer';

const TermsOfService = () => {
  return (
    <>
        <Header />
        <div className='privacy-head' style={{backgroundColor:'#fff',overflowY: 'auto', maxHeight: 'calc(100vh - 65px)', maxWidth:'100vw'}}>
            <div className="container">
                <h1 className="privacy-title">Vortex Terms of Service</h1>
                <p className="last-revised">Last Updated: 23-Aug-2024</p>
                <section className="privacy-section">
                    <h2 className='ph2'>Acceptance of Terms</h2>
                    <p style={{marginLeft:'30px'}}>
                    By accessing or using the Vortex service, you agree to comply with all the terms outlined below. Please review these terms carefully before using our service. If you do not agree with any part of these terms, do not use the service. If anything is unclear, feel free to contact us at <a href="mailto:support@vortexapis.com">support@vortexapis.com</a>.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Modifications to Terms</h2>
                    <p style={{marginLeft:'30px'}}>
                    We reserve the right to modify these Terms at any time. For example, we may update these Terms when introducing new features or for other reasons. Changes to these Terms will be effective three months after they are posted, as indicated by the revised date at the top of these Terms, or immediately upon your acceptance if we provide a mechanism for your immediate acceptance. It's your responsibility to review the Terms periodically for any updates.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Privacy Policy</h2>
                    <p style={{marginLeft:'30px'}}>
                    For information on how we collect and use information from users, please refer to our Privacy Policy available at Vortex.com/PrivacyPolicy.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Third-Party Services</h2>
                    <p style={{marginLeft:'30px'}}>
                    Occasionally, we may provide links to third-party websites or services that we do not own or control. Your use of these third-party services is governed by their own terms and privacy policies. We recommend that you review the terms and privacy policies of any third-party applications, websites, or services that you access through Vortex.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Account Creation</h2>
                    <p style={{marginLeft:'30px'}}>
                    When you create an account or log in through another service, you are responsible for maintaining the security of your password and accept all risks of unauthorized access to your data. If you notice or suspect any security breaches, please inform us immediately.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Content and Conduct</h2>
                    <p style={{marginLeft:'30px'}}>
                    Our service allows you to post, link, and share content. You are responsible for ensuring that the content you provide is legal, reliable, and appropriate.
                    </p>
                    <p style={{marginLeft:'30px'}}>
                    By posting content on Vortex, you grant us the right to use, reproduce, modify, publicly perform, display, and distribute your content through our service. While we may format your content for display, we will not alter the substance of your content.
                    </p>
                    <p style={{marginLeft:'30px'}}>
                    You retain all rights to the content you post, link, or share on Vortex, aside from our limited right to use it. You may remove your content by deleting it from the service, though copies may remain in our backups for a period of time.
                    </p>
                    <p style={{marginLeft:'30px'}}>
                    You agree not to post content that is defamatory, illegal, violates intellectual property rights, or contains viruses or harmful code. Additionally, you must not engage in any activity that disrupts or interferes with the service or other users.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Vortex Materials</h2>
                    <p style={{marginLeft:'30px'}}>
                    We invest significant effort into creating the Vortex service, including its design, text, graphics, and other content. This content is owned by us or our licensors and is protected by copyright laws.
                    </p>
                    <p style={{marginLeft:'30px'}}>
                    Unless explicitly stated, you are not permitted to publicly perform, display, modify, or create derivative works from the service content, use data mining tools, or reverse engineer any part of the service.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Hyperlinks and Third-Party Content</h2>
                    <p style={{marginLeft:'30px'}}>
                    You may create hyperlinks to Vortex, but you may not use our trademarks, logos, or proprietary information without our written consent. We are not responsible for third-party websites linked to or from Vortex.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Disclaimer of Warranties</h2>
                    <p style={{marginLeft:'30px'}}>
                    The Vortex service is provided "as is" and "as available" without any warranties. We disclaim all warranties, whether express or implied, including those related to the service's availability, accuracy, or completeness.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Limitation of Liability</h2>
                    <p style={{marginLeft:'30px'}}>
                    Vortex will not be liable for any special, indirect, incidental, or consequential damages arising from the use of the service. Our total liability will be limited to the amount you paid to Vortex.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Indemnification</h2>
                    <p style={{marginLeft:'30px'}}>
                    You agree to indemnify and hold Vortex harmless from any claims or demands arising from your use of the service or violation of these Terms.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Copyright Complaints</h2>
                    <p style={{marginLeft:'30px'}}>
                    We respect intellectual property rights and may terminate access to users who repeatedly infringe on others' rights in accordance with the Digital Millennium Copyright Act (DMCA).
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Termination</h2>
                    <p style={{marginLeft:'30px'}}>
                    If you breach these Terms, we reserve the right to suspend or terminate your access to the service.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Entire Agreement</h2>
                    <p style={{marginLeft:'30px'}}>
                    These Terms constitute the entire agreement between you and Vortex regarding your use of the service.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Feedback</h2>
                    <p style={{marginLeft:'30px'}}>
                    We welcome your feedback. By providing feedback to Vortex, you assign us all rights to use your feedback.
                    </p>
                </section>
                <section className="privacy-section">
                    <h2 className='ph2'>Contact Information</h2>
                    <p style={{marginLeft:'30px'}}>
                        For questions or comments about the service, contact us at <a href="mailto:support@vortexapis.com">support@vortexapis.com</a>.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    </>
  );
};

export default TermsOfService;
