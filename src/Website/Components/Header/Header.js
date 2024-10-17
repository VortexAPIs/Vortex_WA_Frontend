import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from '../../Assets/vortex_final_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function TopNav() {
  const [isActive, setIsActive] = useState('/')
  const navigate = useNavigate();

  // const handleScroll = (e, id) => {
  //   e.preventDefault();
  //   const section = document.querySelector(id);
  //   if (section) {
  //       section.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
  
  useEffect(() => {
    const currentPath = window.location.pathname;
    // console.log(currentPath)
    setIsActive(currentPath)
  }, []);

  return (
    <>
    <Navbar expand="lg fixed" id='navtop' style={{borderBottom:'solid 1.2px grey', height:'65px'}}>
      <Navbar.Brand style={{ width: '13%', textAlign: 'center' }}>
        <Link to={'/'}>
          <img src={Logo} height={45} className="d-inline-block align-top" alt="" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle style={{marginRight:'30px', backgroundColor:'transparent'}} />
      <Navbar.Collapse className="justify-content-center">
            <Nav className='header-nav' variant='underline'>
              <Nav.Item>
                <Nav.Link as={Link} to="/" className={isActive === '/' ? 'active':''} onClick={() => setIsActive('/')}>Home</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link as={Link} to="/about" className={isActive ==='/about' ? 'active':''} onClick={() => setIsActive('/about')}>About Us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/contact" className={isActive ==='/contact' ? 'active':''} onClick={() => setIsActive('/contact')} >Contact Us</Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link as={Link} to="/privacy" className={isActive ==='/privacy' ? 'active':''} onClick={() => setIsActive('/privacy')}>Privacy Policy</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/terms" className={isActive ==='/terms' ? 'active':''} onClick={() => setIsActive('/terms')}>Terms & Conditions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              </Nav.Item>
            </Nav>
            <Navbar.Brand style={{ width: '13%', textAlign: 'center' }}>
              <button className='cta-button-header' style={{ marginRight: '3%' }} onClick={() => navigate('/signup')}>Get Free Trial</button>
              
            </Navbar.Brand>
          </Navbar.Collapse>
    </Navbar>
    
  </>
        
  );
}

export default TopNav;
