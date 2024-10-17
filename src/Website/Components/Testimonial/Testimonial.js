import React from 'react';
import './Testimonial.css';

const Testimonials = () => {
  return (
    <>
      <section className="testimonials" id="testimonials">
        <div className="container">
          <h2 style={{textAlign:'center', justifyContent:'center', paddingBottom:'30px',  color:'#ff6600'}}>What Our Users Say</h2>
          <div className="testimonials-list">
            <div className="testimonial-item">
              <p>"Maytapi transformed our customer service process."</p>
              <h4>John Doe</h4>
              <span>CEO, Example Inc.</span>
            </div>
            <div className="testimonial-item">
              <p>"Incredible tool for automating WhatsApp!"</p>
              <h4>Jane Smith</h4>
              <span>CTO, Tech Solutions</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
