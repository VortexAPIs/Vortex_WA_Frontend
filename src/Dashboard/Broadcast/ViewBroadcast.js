import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { Button, Table, Pagination } from 'react-bootstrap';
import apiService from '../../apiService';
import { format } from 'date-fns';

function ViewBroadcast() {
    let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }

    const [broadcasts, setBroadcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const uuid = localStorage.getItem('uuid');
    const role = localStorage.getItem('role')

    const fetchBroadcasts = async () => {
        try {
            await apiService.post(`/api/v1/dash/broadcast/view`, { uuid, role })
                .then((data) => {
                    // console.log(data.data.result.result)
                    if (data.data.message === "Broadcasts Found") {
                        setBroadcasts(data.data.result.result);
                        setIsLoading(false);
                    }
                });
        } catch (error) {
            console.error('Error fetching broadcasts:', error);
        }
    };

    useEffect(() => {
        fetchBroadcasts();
        // eslint-disable-next-line
    }, []);

    const handleViewClick = (broadID) => {
        navigate(`/dashboard/broadcast?id=${broadID}`);
    };

    const indexOfLastTicket = currentPage * rowsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
    const currentBroadcasts = broadcasts.slice(indexOfFirstTicket, indexOfLastTicket);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    // const handleRowsPerPageChange = (e) => setRowsPerPage(Number(e.target.value));

    return (
        <>        
            <Table responsive striped bordered style={{ verticalAlign: "middle", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Attachment</th>
                        <th>Issued On</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="7">Loading Broadcasts...</td>
                        </tr>
                    ) : (currentBroadcasts.map((ticks, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ticks.subject}</td>
                            <td>{ticks.description}</td>
                            <td><Link target='_blank' to={`${apiUrl}/api/v1/dash/broadcast/broadcastFiles/${ticks.fileName}`}>{ticks.fileName}</Link></td>
                            <td>{format(new Date(ticks.issueDate), "dd-MMM-yyyy")}</td>
                            <td>
                                <Button variant="outline-success" size="sm" style={{ marginBottom: '2px' }} onClick={() => handleViewClick(ticks.broadID)}>
                                    View
                                </Button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </Table>                    
            <Pagination>
                {Array.from({ length: Math.ceil(broadcasts.length / rowsPerPage) }).map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}

export default ViewBroadcast
