import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { Button, Table, Pagination } from 'react-bootstrap';
import apiService from '../../apiService';
import { format } from 'date-fns';

function ViewAnnouncement() {
    let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }

    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const uuid = localStorage.getItem('uuid');
    const role = localStorage.getItem('role')

    const fetchAnnouncements = async () => {
        try {
            await apiService.post(`${apiUrl}/api/v1/dash/announcement/view`, { uuid, role })
                .then((data) => {
                    if (data.data.result.message === "Announcements Found") {
                        setAnnouncements(data.data.result.result);
                        setIsLoading(false);
                    }
                });
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
        // eslint-disable-next-line
    }, []);

    const handleViewClick = (broadID) => {
        navigate(`/dashboard/announcement?id=${broadID}`);
    };

    const indexOfLastTicket = currentPage * rowsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
    const currentAnnouncements = announcements.slice(indexOfFirstTicket, indexOfLastTicket);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
                            <td colSpan="7">Loading Announcements...</td>
                        </tr>
                    ) : (currentAnnouncements.map((ticks, index) => (
                        
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ticks.subject}</td>
                            <td>{ticks.description}</td>
                            <td><Link to={`${apiUrl}/api/v1/dash/announcement/announceFiles/${ticks.fileName}`} target='_blank' rel='noreferrer'>{ticks.fileName}</Link></td>
                           
                            <td>{format(new Date(ticks.issueDate), "dd-MMM-yyyy")}</td>
                            <td>
                                <Button variant="outline-info" size="sm" style={{ marginBottom: '2px' }} onClick={() => handleViewClick(ticks.announceID)}>
                                    View
                                </Button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </Table>                    
            <Pagination>
                {Array.from({ length: Math.ceil(announcements.length / rowsPerPage) }).map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}

export default ViewAnnouncement
