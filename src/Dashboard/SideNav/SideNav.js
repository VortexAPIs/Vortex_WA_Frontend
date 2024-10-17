import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Main/Main.css'



function SideNav({ isOpen , isTopNavFrozen }) {
    const classText = (isOpen && isTopNavFrozen) ?('side-nav side-nav-open side-nav-frozen toggle') : (isOpen && !isTopNavFrozen) ? ('side-nav side-nav-open toggle') : (!isOpen && isTopNavFrozen) ?('side-nav side-nav side-nav-frozen toggle') : ('side-nav toggle')
    const role = localStorage.getItem('role')
    const path = window.location.pathname;

    const location = useLocation();  // Get current URL path
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();

    const darkActive = () => {
        const darkMode = document.getElementById('dark-mode')
        document.body.classList.toggle('dark-mode-variables');
        darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
        darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
        if(path === '/dashboard'){
            document.getElementById('tbl').setAttribute('variant','dark')
        }
    }

    const handleLogout = () => {
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
        }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            
            navigate('/login');
        }
        });
        document.getElementById("swal2-checkbox").style.display = "none";
    }

    // Set the active link when the URL path changes
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    
    const handleSetActive = (path) => {
        setActiveLink(path);  // Manually set the active link
    };

    const handleCollapse = (id) => {
        // Close all collapsible elements
        document.querySelectorAll('.collapse').forEach(el => el.classList.remove('show'));
    
        // Open the clicked one
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('show');
        }
    };
    

  return (
    <>
        <div className={classText}>
            {isOpen ? (
                <>
                    <Link
                        to="/dashboard"
                        style={{ marginTop: '5%', fontSize: '15px' }}
                        className={activeLink === '/dashboard' ? 'active' : ''}
                        onClick={() => handleSetActive('/dashboard')}
                    >
                        <i className="fa-solid fa-mobile-retro"></i> Dashboard
                    </Link>

                    <Link
                        to="#developers"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="developers"
                        style={{ fontSize: '15px' }}
                        className={activeLink === '/dashboard/apiDocs' || activeLink === '/dashboard/logs' ? 'active' : ''}
                        onClick={() => handleCollapse('developers')}
                    >
                        <i className="fa fa-fw fa-code"></i> Developers
                    </Link>
                    <ul id="developers" className="collapse">
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/apiDocs"
                                style={{ fontSize: '12px' }}
                                className={activeLink === '/dashboard/apiDocs' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/apiDocs')}
                            >
                                Documentation
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/logs"
                                style={{ fontSize: '12px' }}
                                className={activeLink === '/dashboard/logs' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/logs')}
                            >
                                Logs
                            </Link>
                        </li>
                    </ul>

                    <Link
                        to="#integrate"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="integrate"
                        style={{ fontSize: '15px' }}
                        className={activeLink === '/dashboard/gSheet' ? 'active' : ''}
                        onClick={() => handleCollapse('integrate')}
                    >
                        <i className="fa-solid fa-handshake-angle"></i> Integrations
                    </Link>
                    <ul id="integrate" className="collapse">
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/gSheet"
                                style={{ fontSize: '12px' }}
                                className={activeLink === '/dashboard/gSheet' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/gSheet')}
                            >
                                Google Sheets
                            </Link>
                        </li>
                    </ul>

                    <Link
                        to="#tools"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="tools"
                        style={{ fontSize: '15px' }}
                        className={
                            activeLink === '/dashboard/base64' || activeLink === '/dashboard/check-whatsapp-number'
                                ? 'active'
                                : ''
                        }
                        onClick={() => handleCollapse('tools')}
                    >
                        <i className="fa-solid fa-screwdriver-wrench"></i> Tools
                    </Link>
                    <ul id="tools" className="collapse">
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/base64"
                                style={{ fontSize: '12px' }}
                                className={activeLink === '/dashboard/base64' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/base64')}
                            >
                                Base64 Encoder/Decoder
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/check-whatsapp-number"
                                style={{ fontSize: '12px' }}
                                className={activeLink === '/dashboard/check-whatsapp-number' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/check-whatsapp-number')}
                            >
                                WhatsApp Number Checker
                            </Link>
                        </li>
                    </ul>

                    <Link
                        to="/dashboard/subscribe"
                        style={{fontSize:'15px'}}
                        className={activeLink === '/dashboard/subscribe' ? 'active' : ''}
                        onClick={() => handleSetActive('/dashboard/subscribe')}
                    >
                        <i className="fa-solid fa-cart-shopping"></i> Subscriptions
                    </Link>
                    <Link
                        to="#tickets"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="tickets"
                        style={{fontSize:'15px'}}
                        className={(activeLink === '/dashboard/createTicket' || activeLink === '/dashboard/viewTickets' || activeLink === '/dashboard/ticket') ? 'active' : ''}
                        onClick={() => handleCollapse('tickets')}
                    >
                        <i className="fa-solid fa-question fa-xl"></i> Help Center
                    </Link>
                    <ul id='tickets' className='collapse'>
                        <li className="list-group-item" style={{display:role === 'Admin'? 'none' : 'block'}}>
                            <Link
                                to="/dashboard/createTicket"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/createTicket' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/createTicket')}> Create New Ticket
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/viewTickets"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/viewTickets' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/viewTickets')}> View Tickets
                            </Link>
                        </li>
                    </ul>
                    <Link
                        to="#announce"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="announce"
                        style={{fontSize:'15px'}}
                        className={(activeLink === '/dashboard/createAnnouncement' || activeLink === '/dashboard/viewAnnouncements' || activeLink === '/dashboad/announcement') ? 'active' : ''}
                        onClick={() => handleCollapse('announce')}
                    >
                        <i className="fa-solid fa-bell"></i> Announcements
                    </Link>
                    <ul id='announce' className='collapse'>
                        <li className="list-group-item" style={{display:role === 'Admin'? 'block' : 'none'}}>
                            <Link
                                to="/dashboard/createAnnouncement"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/createAnnouncement' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/createAnnouncement')}> Create New Announcement
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/viewAnnouncements"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/viewAnnouncements' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/viewAnnouncements')}> View Announcements
                            </Link>
                        </li>
                    </ul>
                    <Link
                        to="#broadcast"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="broadcast"
                        style={{fontSize:'15px'}}
                        className={(activeLink === '/dashboard/createBroadcast' || activeLink === '/dashboard/viewBroadcast' || activeLink === '/dashboard/broadcast') ? 'active' : ''}
                        onClick={() => handleCollapse('broadcast')}
                    >
                        <i className="fa-solid fa-bullhorn"></i> Broadcasts
                    </Link>
                    <ul id='broadcast' className='collapse'>
                        <li className="list-group-item" style={{display:role === 'Admin'? 'block' : 'none'}}>
                            <Link
                                to="/dashboard/createBroadcast"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/createBroadcast' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/createBroadcast')}> Create New Broadcast
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/viewBroadcast"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/viewBroadcast' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/viewBroadcast')}> View Broadcasts
                            </Link>
                        </li>
                    </ul>
                    <div id='topToSide'>
                        <Link to="/dashboard/profile" style={{transform:'translateY(calc(100vh - 70vh))'}} onClick={() => handleCollapse('basic-nav-dropdown')}>
                            <span class="material-symbols-outlined" style={{fontSize:'40px', marginLeft:'-10px', color:'green'}}>manage_accounts</span>
                        </Link>
                        <i className="fa-solid fa-right-from-bracket" style={{fontSize:'30px', marginLeft:'10px', transform:'translateY(calc(100vh - 70vh))', color:'red', cursor:'pointer'}} onClick={handleLogout}></i>
                        <div id='dark-mode' style={{marginLeft:'5%',transform:'translateY(calc(100vh - 68vh))'}} className="dark-mode" onClick={darkActive}>
                            <span className="material-icons-sharp active">
                                light_mode
                            </span>
                            <br />
                            <span className="material-icons-sharp">
                                dark_mode
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link
                        to="/dashboard"
                        style={{marginTop:'5%', fontSize:'15px'}}
                        className={activeLink === '/dashboard' ? 'active' : ''}
                        onClick={() => handleSetActive('/dashboard')}
                    >
                        <i className="fa-solid fa-mobile-retro"></i>
                    </Link>        
                    <Link
                        to="#developers"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="developers"
                        style={{fontSize:'15px'}}
                        className={(activeLink === '/dashboard/apiDocs' || activeLink === '/dashboard/logs') ? 'active' : ''}
                        onClick={() => handleCollapse('developers')}
                    >
                        <i className="fa fa-fw fa-code"></i>
                    </Link>
                    <ul id = "developers" className='collapse'>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/apiDocs"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/apiDocs' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/apiDocs')}>Docs
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/logs"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/logs' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/logs')}>Logs
                            </Link>
                        </li>
                    </ul>                  
                    <Link
                        to="#integrate"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="integrate"
                        style={{fontSize:'15px'}}
                        className={activeLink === '/dashboard/gSheet' ? 'active' : ''}
                        onClick={() => handleCollapse('integrate')}
                    >
                        <i className="fa-solid fa-handshake-angle"></i>
                    </Link>
                    <ul as="ul" id='integrate' className='collapse'>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/gSheet' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/gSheet')}>Gsheet
                            </Link>
                        </li>
                    </ul>
                    <Link
                        to="#tools"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="tools"
                        style={{fontSize:'15px'}}
                        className={(activeLink === '/dashboard/base64' || activeLink === '/dashboard/check-whatsapp-number') ? 'active' : ''} 
                        onClick={() => handleCollapse('tools')}
                    >
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </Link>
                    <ul as="ul" id='tools' className='collapse'>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/base64"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/base64' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/base64')}>Base64
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/check-whatsapp-number"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/check-whatsapp-number' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/check-whatsapp-number')}>Check Number
                            </Link>
                        </li>
                    </ul>
                    <Link
                        to="/dashboard/subscribe"
                        style={{fontSize:'15px'}}
                        className={activeLink === '/dashboard/subscribe' ? 'active' : ''}
                        onClick={() => handleSetActive('/dashboard/subscribe')}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                    <Link
                        to="#tickets"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="tickets"
                        style={{fontSize:'15px'}}
                        className={(activeLink === '/dashboard/createTicket' || activeLink === '/dashboard/viewTickets' || activeLink === '/dashboard/ticket') ? 'active' : ''}
                        onClick={() => handleCollapse('tickets')}
                    >
                        <i className="fa-solid fa-question fa-xl"></i>
                    </Link>
                    <ul id='tickets' className='collapse'>
                        <li className="list-group-item" style={{display:role === 'Admin'? 'none' : 'block'}}>
                            <Link
                                to="/dashboard/createTicket"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/createTicket' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/createTicket')}>Create
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/viewTickets"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/viewTickets' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/viewTickets')}>View
                            </Link>
                        </li>
                    </ul>
                    <Link
                        to="#announce"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="announce"
                        style={{fontSize:'15px'}}
                        className={(activeLink === '/dashboard/createAnnouncement' || activeLink === '/dashboard/viewAnnouncements' || activeLink === '/dashboad/announcement') ? 'active' : ''}
                        onClick={() => handleCollapse('announce')}
                    >
                        <i className="fa-solid fa-bell"></i>
                    </Link>
                    <ul id='announce' className='collapse'>
                        <li className="list-group-item" style={{display:role === 'Admin'? 'block' : 'none'}}>
                            <Link
                                to="/dashboard/createAnnouncement"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/createAnnouncement' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/createAnnouncement')}>Create
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/viewAnnouncements"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/viewAnnouncements' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/viewAnnouncements')}>View
                            </Link>
                        </li>
                    </ul>
                    <Link
                        to="#broadcast"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="broadcast"
                        style={{fontSize:'15px'}}
                        className={(activeLink === '/dashboard/createBroadcast' || activeLink === '/dashboard/viewBroadcast' || activeLink === '/dashboard/broadcast') ? 'active' : ''}
                        onClick={() => handleCollapse('broadcast')}
                    >
                        <i className="fa-solid fa-bullhorn"></i>
                    </Link>
                    <ul id='broadcast' className='collapse'>
                        <li className="list-group-item" style={{display:role === 'Admin'? 'block' : 'none'}}>
                            <Link
                                to="/dashboard/createBroadcast"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/createBroadcast' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/createBroadcast')}>Create
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link
                                to="/dashboard/viewBroadcast"
                                style={{fontSize:'12px'}}
                                className={activeLink === '/dashboard/viewBroadcast' ? 'active' : ''}
                                onClick={() => handleSetActive('/dashboard/viewBroadcast')}>View
                            </Link>
                        </li>
                    </ul>
                    <div id='topToSideClose'>
                        <Link to="/dashboard/profile" style={{transform:'translateY(calc(100vh - 70vh))'}} onClick={() => handleCollapse('basic-nav-dropdown')}>
                            <span class="material-symbols-outlined" style={{fontSize:'40px', marginLeft:'-10px', color:'green'}}>manage_accounts</span>
                        </Link>
                        <i className="fa-solid fa-right-from-bracket" style={{fontSize:'30px', marginLeft:'10px', transform:'translateY(calc(100vh - 70vh))', color:'red', cursor:'pointer'}}></i>
                        <div id='dark-mode' style={{paddingLeft:'20%',transform:'translateY(calc(100vh - 68vh))'}} className="dark-mode" onClick={darkActive}>
                            <span className="material-icons-sharp active">
                                light_mode
                            </span>
                            <br />
                            <span className="material-icons-sharp">
                                dark_mode
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>

    </>
  )
}

export default SideNav
