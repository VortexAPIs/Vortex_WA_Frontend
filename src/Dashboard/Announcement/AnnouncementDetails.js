import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiService from '../../apiService';
import { format } from 'date-fns';

function AnnouncementDetails() {
    let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [announcement, setAnnouncement] = useState(null);
    const [fileContent, setFileContent] = useState(null);

    useEffect(() => {
        // Function to fetch the announcement
        const fetchAnnouncement = async () => {
            try {
                const response = await apiService.get(`/api/v1/dash/announcement/${id}`);
                setAnnouncement(response.data.result[0]);

                // Fetch the file content if a file path exists
                if (response.data.result[0].filePath) {
                    fetchFileContent(response.data.result[0].fileName);
                }
            } catch (error) {
                console.error('Error fetching announcement:', error);
            }
        };

        // Function to fetch file content for preview
        const fetchFileContent = async (filePath) => {
            try {
                const response = await apiService.get(`/api/v1/dash/announcement/announceFiles/${filePath}`, {
                    responseType: 'blob' // Set responseType to 'blob' to handle binary data
                });
                const fileType = response.headers['content-type'];

                if (fileType.startsWith('text/csv')) {
                    const text = await response.data.text();
                    const csvData = parseCSV(text);
                    setFileContent({ type: 'csv', content: csvData });
                } else if (fileType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                    // For .xlsx files, show a message or thumbnail
                    setFileContent({ type: 'xlsx' });
                } else if (fileType.startsWith('image/')) {
                    const imageUrl = URL.createObjectURL(response.data);
                    setFileContent({ type: 'image', content: imageUrl });
                } else if (fileType === 'application/pdf') {
                    const pdfUrl = URL.createObjectURL(response.data);
                    setFileContent({ type: 'pdf', content: pdfUrl });
                } else {
                    console.error('Unsupported file type:', fileType);
                }
            } catch (error) {
                console.error('Error fetching file content:', error);
            }
        };

        const parseCSV = (csvText) => {
            const rows = csvText.trim().split('\n').map(row => row.split(','));
            return rows;
        };

        fetchAnnouncement();
    }, [id, apiUrl]);

    if (!announcement) return <div>Loading...</div>;

    return (
        <>
            <h2>{announcement.subject}</h2>
            <p>{announcement.description}</p>
            
            {announcement.filePath && (
                <div>
                    <h4>File Preview:</h4>
                    {fileContent ? (
                        <>
                            {fileContent.type === 'csv' && (
                                <div>
                                    <p>This is an Excel file. Preview is not available. <a href={`${apiUrl}/api/v1/dash/announcement/announceFiles/${announcement.fileName}`} download>Download Now</a></p>
                                </div>
                            )}
                            {fileContent.type === 'xlsx' && (
                                <div>
                                    <p>This is an Excel file. Preview is not available. <a href={`${apiUrl}/api/v1/dash/announcement/announceFiles/${announcement.fileName}`} download>Download Now</a></p>
                                </div>
                            )}
                            {fileContent.type === 'image' && (
                                <>
                                    <img src={fileContent.content} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} /><br />
                                    <a href={`${apiUrl}/api/v1/dash/announcement/announceFiles/${announcement.fileName}`} download>Download Now</a>
                                </>
                            )}
                            {fileContent.type === 'pdf' && (
                                <>
                                    <iframe src={fileContent.content} style={{ width: '100%', height: '500px' }} title="PDF Preview"></iframe><br />
                                    <a href={`${apiUrl}/api/v1/dash/announcement/announceFiles/${announcement.fileName}`} download>Download Now</a>
                                </>
                            )}  
                        </>
                    ) : (
                        <p>Loading file preview...</p>
                    )}
                </div>
            )}
            
            <p>Issue Date: {format(new Date(announcement.issueDate), "dd-MMM-yyyy")}</p>
        </>
    );
}

export default AnnouncementDetails;
