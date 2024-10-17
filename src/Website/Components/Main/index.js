import React from "react";
import './index.css';
import Header from "../Header/Header";
import Hero from '../Hero/Hero';
import Features from '../Features/Features';
import Integrate from '../Integration/Integration';
// import Testimonial from '../Testimonial/Testimonial';
import Footer from '../Footer/Footer';
import GettingStarted from "../GettingStarted/GettingStarted";
import Pricing from "../Pricing/Pricing";

function Index() {
    return (
      <>
        <Header />
        <div className="Index" style={{backgroundColor:'#fff',overflowY: 'auto', maxHeight: 'calc(100vh - 65px)', maxWidth:'100vw'}}>
            <Hero />
            <Features />
            <Integrate />
            <GettingStarted />
            <Pricing />
            {/* <Testimonial /> */}
            <Footer />
        </div>
      </>
      );
    }
    
    export default Index;
    