import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import socket from '../../socketManager';
import {format} from 'date-fns';
import Swal from "sweetalert2";
import apiService from '../../apiService';

function Wa() {
  
  const [insSessions, setInsSessions] = useState({});
  const [authenticatedSessions, setAuthenticatedSessions] = useState([]);
  // const [authenticatedSessions, setAuthenticatedSessions] = useState(() => {
  //   const savedSessions = localStorage.getItem('authenticatedSessions');
  //   return savedSessions ? JSON.parse(savedSessions) : [];
  // });
  const [instances, setInstances] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  let instanceCount = 0;

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        Swal.fire({
           title: "Copied to Clipboard",
           text: "Your API Key has been copied to clipboard",
           icon: "success",
           confirmButtonText: "OK",
           confirmButtonColor: "#157347",
         });
         document.getElementById("swal2-checkbox").style.display = "none";
      })
      .catch((err) => console.error("Error copying to clipboard:", err));
  }
  function copyToCB(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        Swal.fire({
           title: "Copied to Clipboard",
           text: "Your Key has been copied to clipboard",
           icon: "success",
           confirmButtonText: "OK",
           confirmButtonColor: "#157347",
         });
         document.getElementById("swal2-checkbox").style.display = "none";
      })
      .catch((err) => console.error("Error copying to clipboard:", err));
  }

  function showAPIKey(key) {
    Swal.fire({
      title: "API Key",
      text: "Your API Key is: " + key,
      icon: "success",
      confirmButtonText: "Copy API Key",
      confirmButtonColor: "#157347",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        copyToClipboard(key);
      }
    });
    document.getElementById("swal2-checkbox").style.display = "none";
  }
  function copy(key) {
    copyToCB(key);
  }

  function logout(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of this session. \n\nTo log back in, you will need to scan the QR code again.",
      icon: "warning",
      confirmButtonText: "Yes, Logout",
      showCancelButton: true,
      cancelButtonText: "No, Cancel",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#157347",
      allowOutsideClick: true,
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("logout", id)
      }
    })  
    document.getElementById("swal2-checkbox").style.display = "none";
  }
  
  function removeInstance(inID){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to remove this instance from our database. \n\nThis action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, Please Remove",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "No, Cancel",
      cancelButtonColor: "#157347",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("removeInstance", inID);
      }
    })
    document.getElementById("swal2-checkbox").style.display = "none";
  }
  const sendTestMsg = (key) => {
    Swal.fire({
      title: "Enter Mobile Number",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: "false",
        type: "number",
        maxlength: 12,
        minlength: 12,
        placeholder: "Enter Mobile Number with country code without + sign",
        required: true,
        style: {          
          color: "#495057 !important",
          backgroundColor: "#fff !important",
          transition: "border-color.15s ease-in-out,box-shadow.15s ease-in-out",
          fontSize: "1rem",
          lineHeight: "1.5",
          borderRadius: ".25rem",
        },
      },
      text: "Enter Mobile Number with country code without + sign",
      icon: "question",
      confirmButtonText: "Send Now",
      confirmButtonColor: "#157347",
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("sendTestMessage", {
          key: key,
          message: {
            body: "Thank you for choosing Vortex WhatsApp API. \n\nThis is a test message. \n\nYou can now proceed with Vortex WhatsApp API.",
            to: result.value,
            type: "chat",
          },
        });
      }
    })
    document.getElementById("swal2-checkbox").style.display = "none";
  };

  const createSessionForWhatsapp = (inID) => {
    console.log(inID);
    socket.emit("createSession", {
      id: inID,
    });
    document.getElementById(inID).textContent= "Loading...";
    document.getElementById(inID).setAttribute("disabled", true);
    document.getElementById(inID).setAttribute("variant", "info");
  };

  const NavigateToBilling = (inID) => {
    navigate("/dashboard/subscribe?insid="+inID);
  };
  
  const uuid = localStorage.getItem("uuid");
  
  useEffect(() => {
    // Emit fetchInstance event
    socket.emit("fetchInstance", { uuid });
    
  }, [uuid]);
  
  const handleInstanceFetched = (respo) => {
    if (respo.message === "Instance Found") {
      setInstances(respo.result);
      // Swal.fire({
      //   title: "Let the magic begin!",
      //   html: `You're all set to use <b>Vortex WhatsApp API</b>`,
      //   icon: "success",
      //   confirmButtonText: "OK",
      // });
      // document.getElementById("swal2-checkbox").style.display = "none";
      setIsLoading(false);
      instanceCount = respo.result.length
      // console.log(respo.result)
    }
  };

  const handleInstanceFetchedReady = (respo) => {
    if (respo.message === "Instance Found") {
      setInstances(respo.result);
      setIsLoading(false);
      instanceCount = respo.result.length
      
    }
  };

  // Function to handle QR event
  const handleQR = (data) => {
    const { qr, id } = data;
    // console.log(id, qr);
    setInsSessions((prevSessions) => ({
      ...prevSessions,
      [id]: qr,
    }));
    // document.getElementById(data.id).setAttribute("hidden",true)
  };

  // Function to handle ready event
  const handleReady = (data) => {
    const { id } = data;
    const { message } = data;
    if(message === 'Client is ready'){
      setAuthenticatedSessions((prevSessions) => [...prevSessions, id]);
      socket.emit("fetchInstanceReady", { uuid });
    }else{
      Swal.fire({
        title: "Cannot Connect!",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          socket.emit("createSession", {
            id: id,
          });
        }}
      );
      document.getElementById("swal2-checkbox").style.display = "none";
    }
  };

  const handleTestMessageSent = (data) => {
    // if(data.message === "Test Message Sent"){
    Swal.fire({
      title: data.title,
      text: data.message,
      icon: (data.title === "Message Sent Successfully")? "success" : "error",
      confirmButtonText: "OK",
    });
    document.getElementById("swal2-checkbox").style.display = "none";
  };

  const handleInstanceRemoved = (data) => {
    Swal.fire({
      title: data.title,
      text: data.message,
      icon: "success",
      confirmButtonText: "OK",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("fetchInstance", {uuid});
      }
    })
    document.getElementById("swal2-checkbox").style.display = "none";
  };

  const removeGSheetID = (data) => {
    Swal.fire({
      title: 'Are You Sure?',
      text: "Do you realy want to remove this google sheet ID.\nYou'll lose the access of Automated BOT from this Token.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Sure",
      confirmButtonColor: "#157347",
      cancelButtonText: "Oh, No",
      cancelButtonColor: 'red'
    }).then((result) => {
      if(result.isConfirmed){
        try {
          const datas = {
            insID: data
          }
          apiService.post('/api/v1/dash/wa/removeGSheetID', datas)
          .then((respo) => {
            // console.log(respo.data)
            if(respo.data.message === "Sheet ID Removed"){
              // setInstanceData(respo.data.result);
              Swal.fire({
                title: respo.data.message,
                text: "Your Google Sheet ID has been successfully removed.",
                icon: "success",
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  socket.emit('fetchInstanceReady', {uuid: localStorage.getItem("uuid")})
                }
              });
              document.getElementById("swal2-checkbox").style.display = "none";
            }else{
              Swal.fire({
                title: respo.data.message,
                text: "Unable To Process Your Request.\nPlease Try Again Later.",
                icon: "error",
                confirmButtonText: "OK",
                allowOutsideClick: true,
              })    
              document.getElementById("swal2-checkbox").style.display = "none";
            }
          })
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Unable To Process Your Request.\nPlease Try Again Later.",
            icon: "error",
            confirmButtonText: "OK",
            allowOutsideClick: true,
          })
          document.getElementById("swal2-checkbox").style.display = "none";
        }
      }
    })
    document.getElementById("swal2-checkbox").style.display = "none";
  }
  const updateGSheetID = (data) => {
    Swal.fire({
      title: 'Your Google Sheet ID',
      text: 'Enter the Google Sheet ID Where You’d Like to Activate Your BOT Magic!',
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: "true",
        type: "text",
        placeholder: "Enter Google Sheet ID",
        required: true,
        style: {          
          color: "#495057 !important",
          backgroundColor: "#fff !important",
          transition: "border-color.15s ease-in-out,box-shadow.15s ease-in-out",
          fontSize: "1rem",
          lineHeight: "1.5",
          borderRadius: ".25rem",
        },
      },
      icon: "question",
      confirmButtonText: "Update Now",
      confirmButtonColor: "#157347",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const datas = {
            insID: data,
            gSheetID: result.value,
          }
          apiService.post('/api/v1/dash/wa/updateGSheetID', datas)
          .then((respo) => {
            console.log(respo.data)
            if(respo.data.message === "Sheet ID Updated"){
              // setInstanceData(respo.data.result);
              Swal.fire({
                title: respo.data.message,
                text: "Your Google Sheet ID has been successfully stored.\nYou're all set to configure your WhatsApp BOT.",
                icon: "success",
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  socket.emit('fetchInstanceReady', {uuid: localStorage.getItem("uuid")})
                }
              });
              document.getElementById("swal2-checkbox").style.display = "none";
            }else{
              Swal.fire({
                title: respo.data.message,
                text: "Unable To Process Your Request.\nPlease Try Again Later.",
                icon: "error",
                confirmButtonText: "OK",
                allowOutsideClick: true,
              })    
              document.getElementById("swal2-checkbox").style.display = "none";
            }
          })
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Unable To Process Your Request.\nPlease Try Again Later.",
            icon: "error",
            confirmButtonText: "OK",
            allowOutsideClick: true,
          })
          document.getElementById("swal2-checkbox").style.display = "none";
        }
      }
    })
    document.getElementById("swal2-checkbox").style.display = "none";
  }
  
  // Event listeners
  socket.on("instanceFetched", handleInstanceFetched);
  socket.on("instanceFetchedReady", handleInstanceFetchedReady);
  socket.on("qr", handleQR);
  socket.on("ready", handleReady);
  socket.on("testMessageSent", handleTestMessageSent);
  socket.on("instanceRemoved", handleInstanceRemoved);
  socket.on("sessionRemoved", (data) => {
    const updatedSessions = authenticatedSessions.filter(sessionId => sessionId !== data.id);
    setAuthenticatedSessions(updatedSessions);
    const updatedInsSessions = { ...insSessions };
    delete updatedInsSessions[data.id];
    setInsSessions(updatedInsSessions)
    Swal.fire({
      title: data.title,
      text: data.message,
      icon: "info",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("fetchInstance", { uuid });
      }
    });
    document.getElementById("swal2-checkbox").style.display = "none";
  });

  return (
    <>
      <Table responsive striped bordered variant="" toggle id="tbl" style={{verticalAlign:"middle",textAlign:"center"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Token ID</th>
            <th>Department</th>
            <th>Authentication Status</th>
            <th>Token Status</th>
            <th>API Key</th>            
            <th>Session Action</th>
            <th>Billing Valid Till</th>
            <th>Send Test Message</th>
            <th>Google Sheet ID</th>
            <th>Delete Token</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="11">Loading tokens...</td>
            </tr>
          ) : (
            instances.map((ins, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ins.uuid} <i className="fa-regular fa-copy" style={{marginLeft:'10px', cursor:'pointer'}} onClick={() => copy(ins.uuid)}></i></td>
                <td>{ins.insid} <i className="fa-regular fa-copy" style={{marginLeft:'10px', cursor:'pointer'}} onClick={() => copy(ins.insid)}></i></td>
                <td>{ins.instanceName} <i className="fa-regular fa-copy" style={{marginLeft:'10px', cursor:'pointer'}} onClick={() => copy(ins.instanceName)}></i></td>
                <td>
                  {ins.authenticated === 0 ? "Not Connected" : "Connected"}<br />
                  {ins.authenticated === 0 ? '' : ins.wid}
                </td>
                <td>
                  {
                    ins.trial === 1 ? 
                      "Trial" : 
                        (ins.trial === 0 && ins.status === "Trial Expired") ? 
                          "Trial Expired" : 
                            (ins.trial === 0 && ins.status === "Expired") ? 
                              "Billing Expired" : 
                                ins.status === '' ? 
                                  '' :
                                    ins.status === 'Active' ?
                                      ins.status : 
                                        "Active"
                  }
                </td>
                <td>
                  {(ins.api_key && ins.authenticated === 1) && (
                    <Button variant="primary" size="sm" onClick={() => showAPIKey(ins.api_key)}>
                      Show API Key
                    </Button>
                  )}
                </td>
                <td>
                  {(insSessions[ins.insid] && !authenticatedSessions.includes(ins.insid) && ins.status !== "Expired") ? (                    
                      <QRCode value={insSessions[ins.insid]} size={150} />
                    ) : (
                      (!authenticatedSessions.includes(ins.insid) && ins.status !== "Expired" && ins.status !== "Trial Expired") ? (
                        <Button variant="success" id={ins.insid} size="sm" onClick={() => createSessionForWhatsapp(ins.insid, index)}>
                          Get QR Code
                        </Button>
                      ) : (ins.status === "Expired" || ins.status === "Trial Expired") ? (
                          <Button variant="danger" id={ins.insid} size="sm" onClick={() => NavigateToBilling(ins.insid)}>
                            Activate Now
                          </Button>
                      ) : ''
                    )
                  }
                  {authenticatedSessions.includes(ins.insid) && (
                    <Button variant="danger" size="sm" onClick={() => logout(ins.insid)}>
                      Logout?
                    </Button>
                  )}
                </td>
                <td>
                  {ins.validTill && (
                    format(ins.validTill, "dd-MMM-yyyy")
                    )}
                </td>
                <td>
                  {((authenticatedSessions.includes(ins.insid) || ins.authenticated === 1) && ins.status !== "Expired") && (
                    <Button variant="success" size="sm" onClick={() => sendTestMsg(ins.api_key)}>Send Test Message</Button>
                    )}
                </td>
                <td>
                  {
                    ((ins.gSheetID !== '' || ins.gSheetID === null)  ? (
                      <>
                        {ins.gSheetID}<br />
                        <span className="material-symbols-outlined" size="30px" style={{cursor:'pointer', marginLeft:'10px', color:'green'}} onClick={() => copy(ins.gSheetID)}>content_copy</span>
                        <span className="material-symbols-outlined" size="30px" style={{cursor:'pointer', marginLeft:'10px', color:'red'}} onClick={() => updateGSheetID(ins.insid)}>edit_square</span>
                        <span className="material-symbols-outlined" size="30px" style={{cursor:'pointer', marginLeft:'10px', color:'red'}} onClick={() => removeGSheetID(ins.insid)}>delete</span>
                      </>
                    )
                    : (
                      <Button variant="success" size="sm" style={{verticalAlign:'middle'}} onClick={() => updateGSheetID(ins.insid)}>Update G Sheet ID</Button>
                    ))
                  }
                </td>
                <td>
                  {(!authenticatedSessions.includes(ins.insid) && ins.authenticated === 0 && ins.trial === 1 && instanceCount > 1) ? (
                    <Button variant="none" size="sm" style={{verticalAlign:'middle'}} onClick={() => removeInstance(ins.insid)}>
                      <span className="material-symbols-outlined" style={{color:'red', cursor: 'pointer'}} onClick={() => removeInstance(ins.insid)}>
                        delete
                      </span> 
                    </Button>
                  ): ((ins.status === 'Expired' || ins.status === 'Trial Expired') && instanceCount > 1) && (
                    <Button variant="none" size="sm" style={{verticalAlign:'middle'}} onClick={() => removeInstance(ins.insid)}>
                      <span className="material-symbols-outlined" style={{color:'red', cursor: 'pointer'}} onClick={() => removeInstance(ins.insid)}>
                        delete
                      </span> 
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Wa;
