import React, { useEffect} from 'react'
import { useNavigate } from'react-router-dom';
import 'swagger-ui-react/swagger-ui.css';
import QRWA from '../WhatsApp/qrcode';
import './Main.css'
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import socket from '../../socketManager';
import Instruction from './instruction_qr';
import apiService from '../../apiService';


function Dashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const insID = localStorage.getItem("insID");
    const uuid = localStorage.getItem("uuid");
    const uName= localStorage.getItem("user");
    
    if (loggedIn === "false" || loggedIn === null || !loggedIn) {
      Swal.fire({
        title: "Login Required",
        text: "You need to get logged in first! Please login to continue",
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      document.getElementById("swal2-checkbox").style.display = "none";
    }
    else{
      const data = {
        uuid: uuid,
        insID: insID,
      }
      try {
        apiService.post('/api/v1/dash/wa/fetchInstance', data)
       .then((respo) => {
          if(respo.data.message === "Instance Found"){
            const filteredData = respo.data.result.filter(item => 
              item.trial === 1 || (item.status && item.status.toLowerCase().includes('expired'))
            );
            
            if(filteredData.length >= 1){
              document.getElementById('insBtn').setAttribute('disabled','disabled')
              document.getElementById('insBtn').classList.replace('btn-success','btn-danger')
            }else{
              document.getElementById('insBtn').removeAttribute('disabled')
              document.getElementById('insBtn').classList.replace('btn-danger','btn-success')
            }
          }else if(respo.data.message === "Instance Created"){
            Swal.fire({
              title: respo.data.message,
              text: `Welcome ${uName}! <br />Your Trial account has been setup successfully!<br /> Happy Automating.`,
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                socket.emit('fetchInstaceReady', {uuid,insID});
              }
            })
          }else{
            Swal.fire({
              title: respo.data.message,
              text: "Please contact your administrator to get access to Vortex WhatsApp API.",
              icon: "error",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate(`/dashboard/createTicket?type=Fetch%20Instance&uuid=${localStorage.getItem("uuid")}`);
              }
            })
            document.getElementById("swal2-checkbox").style.display = "none";
          }
       })
        
      } catch (error) {
        
      }
    }
  }, [navigate]);

  const createInstance =async () => {

    Swal.fire({
      title: "Enter Department Name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: "true",
        type: "text",
        placeholder: "Enter Department Name",
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
      text: "Enter department name for which you need to connect with WhatsApp",
      icon: "question",
      confirmButtonText: "Create Now",
      confirmButtonColor: "#157347",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const insid = uuidv4();
          const data = {
            uuid : localStorage.getItem("uuid"),
            insID: insid,
            name: result.value,
          }
          apiService.post('/api/v1/dash/wa/createInstance', data)
          .then((respo) => {
            if(respo.data.message === "Instance Created"){
              // setInstanceData(respo.data.result);
              Swal.fire({
                title: respo.data.message,
                text: "You can now proceed with Vortex WhatsApp API.",
                icon: "success",
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  socket.emit('fetchInstanceReady', {uuid: localStorage.getItem("uuid")})
                }
              });
              document.getElementById("swal2-checkbox").style.display = "none";
            }else if(respo.data.message === "Instance Limit Reached"){
              Swal.fire({
                title: respo.data.message,
                text: "You have reached the limit of instances you can create. Please raise a ticket to get access to additional instances of Vortex WhatsApp API.",
                icon: "warning",
                confirmButtonText: "Proceed With Ticket",
                confirmButtonColor: "#157347",
                cancelButtonText: "Cancel",
                cancelButtonColor: "#d33",
                showCancelButton: true,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate(`/dashboard/createTicket?type=Create%20New%20Instance&uuid=${localStorage.getItem("uuid")}`);
                }
              });
              document.getElementById("swal2-checkbox").style.display = "none";
            }else{
              Swal.fire({
                title: respo.data.message,
                text: "Please raise a ticket to get this issue resolved.",
                icon: "error",
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate(`/dashboard/createTicket?type=Other&uuid=${localStorage.getItem("uuid")}`);
                }
              });
              document.getElementById("swal2-checkbox").style.display = "none";
            }
          })
        } catch (error) {
          
        }
      }
    })
    document.getElementById("swal2-checkbox").style.display = "none";
  }
  
  return (
    <>
      <QRWA />            
      <Button className='btn-success' id='insBtn' onClick={createInstance}>Create New Instance</Button>
      <hr />
      <Instruction />       
    </>
  );
}

export default Dashboard

