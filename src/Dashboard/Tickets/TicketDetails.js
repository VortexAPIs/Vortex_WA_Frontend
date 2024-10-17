import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import apiService from '../../apiService';
import './ChatStyles.css';
import socket from '../../socketManager';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TicketDetails() {
    
    // const [notifications, setNotifications] = useState([]);
    const location = useLocation();
    const url = location.href || window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);
    const ticketID = urlParams.get('id');
    let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }

    const [ticket, setTicket] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [reply, setReply] = useState('');

    const uuid = localStorage.getItem('uuid');
    // const role = localStorage.getItem('role');

    const ticketDetailsFetched = (data) => {
        // console.log(data)
        setTicket(data.ticket[0]);
        setConversations(data.conversations);
        // toast(`New response: ${data.conversations[0].message}`);
        // You can store the notification if you want to show it in a list
        // setNotifications((prevNotifications) => [...prevNotifications, data.conversations[0].message]);
        // console.log(notifications)
    };
    socket.emit('fetchTicketDetails',{ticketID})
    socket.on('ticketDetailsFetched',ticketDetailsFetched)

    const handleReplySubmit = async () => {
        try {
            const role = localStorage.getItem('role')
            if(reply !== ''){
                await apiService.post(`${apiUrl}/api/v1/dash/ticket/reply?ticketID=${ticketID}`, { reply, uuid, role });
                setReply('');
                socket.emit('fetchTicketDetails',ticketID); // Refresh the conversation
            }
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };
    
    const handleCloseTicket = async () => {
        try {
            await apiService.post(`${apiUrl}/api/v1/dash/ticket/close?ticketID=${ticketID}`);
            socket.emit('fetchTicketDetails',ticketID); // Refresh the ticket details
        } catch (error) {
            console.error('Error closing ticket:', error);
        }
    };

    return (
        <>
            {ticket ? (
                
                    <div className='row'>
                        <div className='col-4 chat-box'>
                            <div className="header-chat">
                                <div className="ticket-id"></div>
                                <div className="subject">
                                    Ticket Details
                                </div>                                        
                            </div>
                            <div style={{padding:'10px'}}>
                                <h4 style={{fontSize:'25px'}}>Ticket ID:</h4>
                                <p style={{fontSize:'20px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{ticketID}</p>
                            </div>
                            <div style={{padding:'10px'}}>
                                <h4 style={{fontSize:'25px'}}>Subject:</h4>
                                <p style={{fontSize:'20px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{ticket.subject}</p>
                            </div>
                            <div style={{padding:'10px'}}>
                                <b style={{fontSize:'25px'}}>Issue Detail:</b>
                                <p style={{fontSize:'20px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{ticket.issue}</p>
                            </div>
                            <div style={{padding:'10px'}}>
                                <b style={{fontSize:'25px'}}>Issue Raised On:</b>
                                <p style={{fontSize:'20px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{new Date(ticket.ticketDate).toLocaleString()}</p>
                            </div>
                            <div className="status-container">
                                <Button variant='success' className="status" disabled>{ticket.status}</Button>
                                {ticket.status === 'Open' ? 
                                    <Button variant="danger" onClick={handleCloseTicket}>Close Ticket</Button>
                                : ''}
                            </div>
                        </div>
                        <div className='col-8 chat-box'>
                            <div className="header-chat">
                                
                                <div className="subject">{ticket.issueType}</div>
                            </div>
                            <div className="chat-container">
                                {conversations.map((conv, index) => (
                                    <div key={index} className={`message ${(conv.role === 'Admin' || conv.role === 'CRM') ? 'admin' : 'user'}`}>
                                        <div className={`message-bubble ${(conv.role === 'Admin' || conv.role === 'CRM') ? 'admin' : 'user'}`}>
                                            {conv.message}
                                            <div className="timestamp">{new Date(conv.timestamp).toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {ticket.status !== 'Closed' && (
                                <div className="reply-section">
                                    <Form.Group controlId="reply" style={{display: 'flex', alignItems: 'center' }}>
                                        <Form.Control as="textarea" className="" placeholder="Type a message" rows={2} style={{ flexGrow: 1, borderRadius: '30px' }} value={reply} onChange={(e) => setReply(e.target.value)} required />
                                        <i className="fa fa-paper-plane fa-xl send-button" aria-hidden="true" onClick={handleReplySubmit}></i>                                    
                                    </Form.Group>
                                </div>
                            )}
                            
                        </div>
                    </div>
                
            ) : (
                <p>Loading ticket details...</p>
            )}
        </>
    );
}

export default TicketDetails;
