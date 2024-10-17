import { io } from "socket.io-client";

var apiUrl = '';
  if(process.env.REACT_APP_SERVER_STATE === "development") {
    apiUrl = process.env.REACT_APP_LOCAL_API;
  } else {
    apiUrl = process.env.REACT_APP_PROD_API;
  }
// console.log(apiUrl);
const socket = io.connect(apiUrl, {
  // transports: ['websocket']
});
// console.log(socket);
socket.emit('connected','Vikram')
socket.on('Hello',(data) => {
  console.log(data)
})
socket.on('connection', (data) => {
  console.log('Connected to the server', data);
});
export default socket;
