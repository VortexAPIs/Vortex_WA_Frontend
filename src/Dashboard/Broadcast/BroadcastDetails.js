import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiService from '../../apiService';
import { format } from 'date-fns';

function BroadcastDetails() {
    let apiUrl = ''
    if(process.env.REACT_APP_SERVER_STATE === 'Production'){
        apiUrl = process.env.REACT_APP_PROD_API
    }else{
        apiUrl = process.env.REACT_APP_API_URL
    }
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [broadcast, setbroadcast] = useState(null);
    const [fileContent, setFileContent] = useState(null);

    useEffect(() => {
        // Function to fetch the broadcast
        const fetchbroadcast = async () => {
            try {
                const response = await apiService.get(`/api/v1/dash/broadcast/${id}`);
                setbroadcast(response.data.result[0]);

                // Fetch the file content if a file path exists
                if (response.data.result[0].filePath) {
                    fetchFileContent(response.data.result[0].fileName);
                }
            } catch (error) {
                console.error('Error fetching broadcast:', error);
            }
        };

        // Function to fetch file content for preview
        const fetchFileContent = async (filePath) => {
            try {
                const response = await apiService.get(`/api/v1/dash/broadcast/broadcastFiles/${filePath}`, {
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
                } else if(fileType !== ''){
                    setFileContent({ type: fileType });
                }else {
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

        fetchbroadcast();
    }, [id, apiUrl]);

    if (!broadcast) return <div>Loading...</div>;

    return (
        <>
            <h2>{broadcast.subject}</h2>
            <p>{broadcast.description}</p>
            
            {broadcast.filePath && (
                <div>
                    <h4>File Preview:</h4>
                    {fileContent ? 
                            (fileContent.type === 'csv' || fileContent.type === 'xlsx' || fileContent.type === 'image' || fileContent.type === 'pdf') ? (
                                <>
                                
                                        {fileContent.type === 'csv' && (
                                            <div>
                                                <p>This is a csv file. Preview is not available. You can still download it. <a href={`${apiUrl}/api/v1/dash/broadcast/broadcastFiles/${broadcast.fileName}`} target='_blank' rel='noreferrer' style={{textDecoration:'none'}} download>Download Now</a></p>
                                            </div>
                                        )}
                                        {fileContent.type === 'xlsx' && (
                                            <div>
                                                <p>This is an Excel file. Preview is not available. You can still download it. <a href={`${apiUrl}/api/v1/dash/broadcast/broadcastFiles/${broadcast.fileName}`} target='_blank' rel='noreferrer' style={{textDecoration:'none'}} download>Download Now</a></p>
                                            </div>
                                        )}
                                        {fileContent.type === 'image' && (
                                            <>
                                                <img src={fileContent.content} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} /><br />
                                                <a href={`${apiUrl}/api/v1/dash/broadcast/broadcastFiles/${broadcast.fileName}`} target='_blank' rel='noreferrer' download>Download Now</a>
                                            </>
                                        )}
                                        {fileContent.type === 'pdf' && (
                                            <>
                                                <iframe src={fileContent.content} style={{ width: '100%', height: '500px' }} title="PDF Preview"></iframe><br />
                                                <a href={`${apiUrl}/api/v1/dash/broadcast/broadcastFiles/${broadcast.fileName}`} target='_blank' rel='noreferrer' download>Download Now</a>
                                            </>
                                        )}
                                </>
                            ) :  (  
                                <>
                                    <div>
                                        <p>This is an unsupported file. Preview is not available. You can still download it. <a href={`${apiUrl}/api/v1/dash/broadcast/broadcastFiles/${broadcast.fileName}`} target='_blank' rel='noreferrer' style={{textDecoration:'none'}} download>Download Now</a></p>
                                    </div>
                                </>
                            ) 
                        
                     : (
                        <p>Loading file preview...</p>
                    )}
                </div>
            )}
            
            <p>Issue Date: {format(new Date(broadcast.issueDate), "dd-MMM-yyyy")}</p>
        </>
    );
}

export default BroadcastDetails;
