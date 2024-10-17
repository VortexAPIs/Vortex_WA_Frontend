import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import apiService from '../../apiService';

function AnnouncementDetails() {
    const localApi = process.env.REACT_APP_LOCAL_API
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams)
    const id = searchParams.get('id');
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        // Function to fetch the announcement
        const fetchAnnouncement = async () => {
            try {
                console.log(id)
                const response = await apiService.get(`/dash/announcement/${id}`);
                console.log(response.data.result[0])
                setAnnouncement(response.data.result[0]);
            } catch (error) {
                console.error('Error fetching announcement:', error);
            }
        };

        fetchAnnouncement();
    }, [id]);

    if (!announcement) return <div>Loading...</div>;

    return (
        <>
            <h2>{announcement.subject}</h2>
            <p>{announcement.description}</p>
                {announcement.filePath && (
                    
                    <div>
                        <p>File: <a href={announcement.filePath} download>{announcement.fileName}</a></p>
                    </div>
                )}
            <p>Issue Date: {new Date(announcement.issueDate).toLocaleDateString()}</p>
        </>
    )
}

export default AnnouncementDetails
    