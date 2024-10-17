import React, {useEffect, useState} from 'react';
import { Navbar, NavDropdown, Badge} from 'react-bootstrap';
import Logo from '../../Website/Assets/vortex_final_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import socket from '../../socketManager';

function TopNav({ toggleSideNav, isSideNavOpen }) {
    const path = window.location.pathname;
    const darkActive = () => {
        const darkMode = document.getElementById('dark-mode')
        document.body.classList.toggle('dark-mode-variables');
        darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
        darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
        if(path === '/dashboard'){
            document.getElementById('tbl').setAttribute('variant','dark')
        }
    }

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + '...';
        }
        return text;
    }

    const [tickets,setTickets] = useState([])
    const [broadCast, setBroadCast] = useState([])
    const [announcements, setAnnouncements] = useState([])
    const navigate = useNavigate();
    const topNavStyle = isSideNavOpen ? {width:'100%', height:'60px'} : { width: '100%', height:'60px'};
    const extenderIcon = isSideNavOpen ? 'chevron_left' : 'chevron_right'
    const user = localStorage.getItem('user');
    
    
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

    const uuid = localStorage.getItem('uuid')
    const role = localStorage.getItem('role')
    
    const handleTicketFetched = (data) => {
        if(data.title === 'Tickets Fetched Successfully'){
            setTickets(data.result)
        }
    }
    const handleBroadCasts = (data) => {
        if(data.title === 'Broadcasts Fetched Successfully'){
            setBroadCast(data.result)
        }
    }
    const handleAnnouncements = (data) => {
        if(data.title === 'Announcements Fetched Successfully'){
            setAnnouncements(data.result)
        }
    }
    useEffect(() => {
        if(role === "user"){
            socket.emit('fetchTicketsUser',{uuid})
            socket.on('ticketsFetchedUser',handleTicketFetched)
            socket.emit('fetchAnnouncementsUser',{uuid})
            socket.on('announcementsFetched', handleAnnouncements)
        }else{
            socket.emit('fetchTickets')
            socket.on('ticketsFetched',handleTicketFetched)
            socket.emit('fetchAnnouncements')
            socket.on('announcementsFetched', handleAnnouncements)
        }
        socket.emit('fetchBroadcasts')
        socket.on('broadCastFetched', handleBroadCasts)

        // isSideNavOpen ? document.getElementById("extender").textContent = 'chevron_left' : document.getElementById("extender").textContent = 'chevron_right'
    },[role, uuid])
  return (
    <>
        <Navbar className=" fixed toggle top-nav" style={topNavStyle} expand="lg">
            <Navbar.Brand style={{width:'11%', textAlign:'left'}}>            
                <Link to={'/dashboard'}>
                    <img src={Logo} height={35} style={{}} className="d-inline-block align-top" alt="" />
                </Link>
            </Navbar.Brand>
            <span className="material-symbols-outlined" id='extender' onClick={toggleSideNav} style={{marginLeft:'0px', cursor:'pointer', fontSize:'2rem', alignSelf:'left'}}>{extenderIcon}</span>
            {/* <Navbar.Toggle /> */}

            {/* <span className="material-symbols-outlined" onClick={toggleSideNav} style={{marginLeft:'0px', cursor:'pointer', fontSize:'2rem', alignSelf:'left'}}>menu</span> */}
            <Navbar.Collapse className="justify-content-end" style={{alignContent:'right', zIndex:100}} id='right-top-nav'>
                <div className="dropdown" style={{marginRight:'20px'}}>
                    <span className="material-symbols-outlined tn-icon-pack dropdown-toggle no-arrow" data-bs-toggle="dropdown" aria-expanded="false" aria-label='arrow-none'>contact_support</span>
                    <Badge pill bg="warning" key='tBadge' style={{ marginLeft: '-40px', transform: 'translateY(-14px)' }}>
                        {tickets.length}
                    </Badge>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0" style={{transform:'translateY(10px)', width:'300px', maxHeight:'400px', overflowY:'auto'}}>
                        <li style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center', fontWeight: 'bold', padding: '5px', borderBottom: '0.1rem solid black', backgroundColor: '#f8f9fa' }}>
                            <span style={{ margin: 0}}>Tickets</span>
                            <Link style={{margin: 0, color:'blue', fontSize:'10px' }} to={'/dashboard/viewTickets'}>View All</Link>
                        </li>
                        {tickets.map((ticket,index) =>(
                            <li style={{borderBottom: '0.1rem solid black'}} key={`li_${ticket.ticketID}`}>
                                <a className="dropdown-item" key={ticket.ticketID} href={`/dashboard/ticket?id=${ticket.ticketID}`}>
                                <span style={{textWrap:'wrap', color: '#ffc107', fontSize:'16px'}}>{truncateText(ticket.issueType,25)}</span>
                                <p style={{textWrap:'wrap', color: 'black', fontSize:'12px'}}>{truncateText(ticket.subject,70)}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="dropdown" style={{marginRight:'20px'}}>
                    <span className="material-symbols-outlined tn-icon-pack dropdown-toggle no-arrow" data-bs-toggle="dropdown" aria-expanded="false" aria-label='arrow-none' style={{}}>campaign</span>
                    <Badge pill bg="success" key='tBadge' style={{ marginLeft: '-40px', transform: 'translateY(-14px)' }}>
                        {broadCast.length}
                    </Badge>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0" style={{transform:'translateY(10px)', width:'300px', maxHeight:'400px', overflowY:'auto'}}>
                        <li style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center', fontWeight: 'bold', padding: '5px', borderBottom: '0.1rem solid black', backgroundColor: '#f8f9fa' }}>
                            <span style={{ margin: 0}}>Broadcasts</span>
                            <Link style={{margin: 0, color:'blue', fontSize:'10px' }} to={'/dashboard/viewBroadcast'}>View All</Link>
                        </li>
                        {broadCast.map((bcast,index) =>(
                            <li style={{borderBottom: '0.1rem solid black'}} key={`li_${bcast.broadID}`}>
                                <a className="dropdown-item" key={bcast.broadID} href={`/dashboard/broadcast?id=${bcast.broadID}`}>
                                <span style={{textWrap:'wrap', color: '#198754', fontSize:'16px'}}>{truncateText(bcast.subject,25)}</span>
                                <p style={{textWrap:'wrap', color: 'black', fontSize:'12px'}}>{truncateText(bcast.description, 70)}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="dropdown" style={{marginRight:'20px'}}>
                    <span className="material-symbols-outlined tn-icon-pack dropdown-toggle no-arrow" data-bs-toggle="dropdown" aria-expanded="false" aria-label='arrow-none'>notifications</span>
                    <Badge pill bg='info' style={{marginLeft: '-40px', transform: 'translateY(-14px)' }} >
                        {announcements.length}
                    </Badge>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0" style={{transform:'translateY(10px)', width:'320px', maxHeight:'400px', overflowY:'auto'}}>
                        <li style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center', fontWeight: 'bold', padding: '5px', borderBottom: '0.1rem solid black', backgroundColor: '#f8f9fa' }}>
                            <span style={{ margin: 0}}>Announcements</span>
                            <Link style={{margin: 0, color:'blue', fontSize:'10px' }} to={'/dashboard/viewAnnouncements'}>View All</Link>
                        </li>
                        {announcements.map((ann,index) =>(
                            <li style={{borderBottom: '0.1rem solid black'}} key={`li_${ann.announceID}`}>
                                <a className="dropdown-item" key={ann.announceID} href={`/dashboard/announcement?id=${ann.announceID}`}>
                                <span style={{textWrap:'wrap', color: '#0dcaf0', fontSize:'16px'}}>{truncateText(ann.subject,20)}</span>
                                <p style={{textWrap:'wrap', color: 'black', fontSize:'12px'}}>{truncateText(ann.description, 50)}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="vl" style={{ borderLeft: '2px solid gold', height: '50px', position: 'Relative', marginLeft: '3px', marginRight: '3%' }}></div>
                <NavDropdown title={user} id="basic-nav-dropdown" style={{ marginRight:'3%', fontSize:'15px'}}>
                    <NavDropdown.Item>
                        <Link to='/dashboard/profile' style={{ color: 'black', fontSize:'17px',textDecorationLine:'none'}}>Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item style={{color:'red', fontSize:'17px',}} onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
                {/* <img src={UserImg} className='tn-icon-pack' alt="" height={35} width={35}/> */}
                <div id='dark-mode' style={{paddingRight:'1%'}} className="dark-mode" onClick={darkActive}>
                    <span className="material-icons-sharp active">
                        light_mode
                    </span>
                    <span className="material-icons-sharp">
                        dark_mode
                    </span>
                </div>
            </Navbar.Collapse>
            
        </Navbar>
    </>
  )
}

export default TopNav
