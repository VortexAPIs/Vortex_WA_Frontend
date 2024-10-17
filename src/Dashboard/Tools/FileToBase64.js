import React, { useState } from 'react';
import './FileToBase64.css';

const FileToBase64 = () => {
  const [base64, setBase64] = useState('');
  const [file, setFile] = useState(null);
  const [decodedFile, setDecodedFile] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  const handleEncode = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const encodedFile = {
          fileName: file.name,
          content: reader.result
        };
        setBase64(btoa(JSON.stringify(encodedFile))); // Convert to Base64 and store
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
  };

  const handleDecodeChange = (e) => {
    setDecodedFile(e.target.value);
  };

  const handleDecode = () => {
    if (decodedFile) {
      const decodedString = atob(decodedFile); // Decode from Base64
      const decodedObject = JSON.parse(decodedString); // Parse JSON to get file content and name

      const link = document.createElement('a');
      link.href = decodedObject.content;
      link.download = decodedObject.fileName || 'decoded_file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <h1>Base64 Encoder/Decoder</h1>
      <div className="grid-container">
        <div className="file-input-container">
          <h3>File Encoder</h3>
          <div className="file-drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
            <input type="file" onChange={handleFileChange} />
            <div className="file-drop-message" onClick={() => document.querySelector('input[type="file"]').click()}>
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16V4m0 12l-7-7m7 7l7-7m-7 7H4m16 0h-4" stroke="#4A4A4A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {fileName ? <p>{fileName}</p> : <p>Drag and drop a file here or click to select</p>}
            </div>
          </div>
          <button className="encode-button" onClick={handleEncode}>Encode to Base64</button>
          <div className="base64-output-container">
            <div className="output-header">
              <h3>Base64 Result</h3>
              <button className="copy-button" onClick={handleCopy}>
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2m0-12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6Z" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <textarea value={base64} readOnly className="base64-textarea"></textarea>
          </div>
        </div>
        <div className="file-input-container">
          <h3>File Decoder</h3>
          <textarea placeholder="Enter Base64 encoded text" value={decodedFile} onChange={handleDecodeChange} className="base64-textarea"></textarea>
          <button className="encode-button" onClick={handleDecode}>Download Decoded File</button>
        </div>
      </div>
    </>
  );
};

export default FileToBase64;
