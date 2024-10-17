import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { Button, Table, Pagination } from 'react-bootstrap';
import apiService from '../../apiService';
import { format } from 'date-fns';

function ViewTickets() {
    let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }

    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const uuid = localStorage.getItem('uuid');
    const role = localStorage.getItem('role')

    const fetchTickets = async () => {
        try {
            await apiService.post(`${apiUrl}/api/v1/dash/ticket/view`, { uuid, role })
                .then((data) => {
                    // console.log(data.data.result)
                    if (data.data.message === "Ticket Found") {
                        setTickets(data.data.result);
                        setIsLoading(false);
                    }
                });
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    useEffect(() => {
        fetchTickets();
        // eslint-disable-next-line
    }, []);

    const handleViewClick = (ticketID) => {
        navigate(`/dashboard/ticket?id=${ticketID}`);
    };

    const indexOfLastTicket = currentPage * rowsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    // const handleRowsPerPageChange = (e) => setRowsPerPage(Number(e.target.value));

    return (
        <>        
            <Table responsive striped bordered hover style={{ verticalAlign: "middle", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ticket ID</th>
                        <th>Department</th>
                        <th>Subject</th>
                        <th>Ticket Status</th>
                        <th>Last Updated On</th>
                        <th>Ticket Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="7">Loading Tickets...</td>
                        </tr>
                    ) : (currentTickets.map((ticks, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ticks.ticketID}</td>
                            <td>{ticks.issueType}</td>
                            <td>{ticks.subject}</td>
                            <td>{ticks.status}</td>
                            <td>{format(new Date(ticks.ticketDate), "dd-MMM-yyyy")}</td>
                            <td>
                                <Button variant="outline-warning" size="sm" style={{ marginBottom: '2px' }} onClick={() => handleViewClick(ticks.ticketID)}>
                                    View
                                </Button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </Table>                    
            <Pagination>
                {Array.from({ length: Math.ceil(tickets.length / rowsPerPage) }).map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
}

export default ViewTickets;
