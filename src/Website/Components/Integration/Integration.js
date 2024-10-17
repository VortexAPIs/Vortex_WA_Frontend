import React from 'react';
import '../Pricing/Pricing.css';

const Pricing = () => {
  return (
    <>
        <section className="pricing" id="integration">
          <div className="container" style={{alignItems:'center', textAlign:'center', justifyContent:'center'}}>
            <div className='headH2' style={{}}>Integrate WhatsApp API Gateway</div>
            <h3 style={{}}>with your preferred language into your custom solution.</h3>
            <iframe title='Integration' src="//api.apiembed.com/?source=https://vortexapis.com/sample.json&targets=shell:curl,node:unirest,java:unirest,python:requests,php:curl,ruby:native,objc:nsurlsession,go:native" frameBorder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
          </div>
        </section>
      <div className="end-cap ecap"></div>
    </>
  );
};

export default Pricing;
